# Monitoring & Alerting

> Grafana Cloud + Alloy 기반 관측 가능성(observability) 스택 구성 기록.

## 전체 구조

```
[NestJS API]  ──/metrics──┐
                          │
[Traefik]  ──access.log──►│   [Alloy]  ── remote_write ──►  [Grafana Cloud]
                                                                ├─ Mimir (메트릭)
                                                                └─ Loki  (로그)
                                                                     ↓
                                                              Grafana Dashboards
                                                              Alert rules → Email
```

- **메트릭(Prometheus pull)**: Alloy가 15초 간격으로 `api:4000/metrics` 스크랩 → Mimir 원격 쓰기
- **로그(Loki push)**: Traefik이 `/var/log/traefik/access.log`에 JSON 로그 출력 → Alloy가 tail → Loki 푸시
- **알람**: Grafana Cloud Alerting이 PromQL 규칙을 평가 → Email contact point로 전송

---

## 수집되는 데이터

### 메트릭 (Prometheus)
| 카테고리 | 메트릭 예시 | 출처 |
|---|---|---|
| Node 런타임 | `nodejs_heap_size_used_bytes`, `nodejs_eventloop_lag_seconds`, `process_cpu_user_seconds_total` | `@willsoto/nestjs-prometheus` defaultMetrics |
| HTTP (선택) | `http_requests_total{method,route,status}` | NestJS interceptor (구현 시) |
| 엣지 (선택) | `traefik_service_requests_total`, `traefik_router_requests_total` | Traefik `--metrics.prometheus` (활성화 시) |

### 로그 (Loki)
Traefik access log를 JSON으로 받아 다음 필드를 라벨로 승격:
- `status` (응답 코드)
- `method` (HTTP 메서드)
- `router` (라우터 이름 — web / api)

원본 JSON에는 `ClientHost`(IP), `Request_Referer`, `Request_User-Agent`, `Duration`, `RequestPath` 등이 포함되어 LogQL로 조회 가능.

---

## 필요한 환경변수 (`.env` on VPS)

```env
# ─── 기존 ─────────────────────────────
GRAFANA_REMOTE_WRITE_URL=https://prometheus-prod-XX-prod-XX.grafana.net/api/prom/push
GRAFANA_USERNAME=<grafana_cloud_metrics_user_id>
GRAFANA_API_TOKEN=<grafana_cloud_api_token>

# ─── 신규 (Loki 로그용) ───────────────
LOKI_PUSH_URL=https://logs-prod-XXX.grafana.net/loki/api/v1/push
LOKI_USERNAME=<grafana_cloud_logs_user_id>
```

> `GRAFANA_API_TOKEN`은 메트릭/로그 양쪽 쓰기 권한이 모두 부여된 단일 Access Policy 토큰을 재사용합니다.
> Grafana Cloud → My Account → 스택 선택 → Loki "Send Logs" 페이지에서 URL과 User ID 확인.

---

## LogQL 예시 (Grafana Explore)

```logql
# 최근 5xx 응답
{job="traefik", status=~"5.."}

# IP별 요청 수 Top 10
topk(10,
  sum by (ClientHost) (
    count_over_time({job="traefik"} | json [1h])
  )
)

# 유입 경로(Referer) 분포
sum by (request_Referer) (
  count_over_time({job="traefik"} | json | request_Referer != "" [24h])
)

# 느린 요청 (1초 이상)
{job="traefik"} | json | Duration > 1000000000
```

> Traefik의 `Duration`은 **나노초** 단위입니다. `> 1000000000` 이 1초.

---

## 알람 규칙

규칙 파일: [`docs/monitoring/alert-rules.yml`](monitoring/alert-rules.yml)

| 알람 | 조건 | 심각도 |
|---|---|---|
| `ApiInstanceDown` | `up{job="nestjs_api"} == 0` 2분 지속 | critical |
| `HighEventLoopLag` | event loop lag > 200ms 5분 지속 | warning |
| `HighProcessMemory` | API RSS > 400MB 10분 지속 | warning |
| `High5xxErrorRate` | Traefik 5xx 비율 > 5% 5분 지속 | critical |
| `TraefikNoTraffic` | 15분간 요청 0건 | warning |

### Grafana Cloud에 적용

1. **Contact point 생성**
   Grafana Cloud → Alerts & IRM → Contact points → "+ Add" → Type: Email → `zaq1308@gmail.com`
2. **Notification policy**
   Default policy의 contact point를 위 contact point로 지정
3. **규칙 import**
   Alerts & IRM → Alert rules → "More" → "Import alert rules from .yaml" → 본 파일 업로드
4. **알람 테스트**
   `ApiInstanceDown` 동작 확인: `docker compose -f compose.prod.yml stop api` → 약 2분 뒤 메일 수신 → `start api`

---

## 운영 체크리스트

```bash
# Alloy가 Traefik 로그 파일을 잘 보고 있는지
docker compose -f compose.prod.yml exec alloy ls -lh /var/log/traefik/

# Alloy 자체 헬스 (메트릭/로그 처리 상태)
curl http://localhost:12345/-/healthy   # VPS 내부에서

# Traefik access log 직접 확인
docker compose -f compose.prod.yml exec traefik tail -f /var/log/traefik/access.log
```

---

## 비용 / 한계

- Grafana Cloud Free tier: 메트릭 10k series · 로그 50GB / month · 14일 보존
- 본 프로젝트 트래픽 수준에서는 무료 한도 내 운영 가능
- 보존 기간 초과 데이터는 자동 만료
