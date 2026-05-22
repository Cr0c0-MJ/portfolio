# Croco Portfolio

> 개인 포트폴리오 웹사이트 — Next.js + NestJS + Docker + AWS EC2 + Grafana Cloud

**라이브:** https://crocoportfolio.com  
**API:** https://api.crocoportfolio.com/api/health

---

## 프로젝트 소개

풀스택 개인 포트폴리오 사이트입니다. 단순히 코드를 작성하는 것을 넘어 **도메인 구매 → DNS 설정 → EC2 서버 구성 → HTTPS 자동화 → CI/CD 파이프라인 → 운영 모니터링/알람**까지 배포 전 과정을 직접 구현했습니다.

---

## 기술 스택

### Frontend
| 기술 | 선택 이유 |
|------|-----------|
| Next.js 14 (App Router) | 서버/클라이언트 컴포넌트 분리, 파일 기반 라우팅, Standalone 빌드로 Docker 이미지 경량화 |
| TypeScript | 타입 안정성 확보, 빌드 타임에 오류 조기 발견 |
| Tailwind CSS | 유틸리티 클래스 기반으로 빠른 UI 구현, 번들 크기 최소화 |

### Backend
| 기술 | 선택 이유 |
|------|-----------|
| NestJS 10 | 모듈/컨트롤러/서비스 계층 분리, 데코레이터 기반 구조로 유지보수 용이 |
| Prisma | 타입 안전한 ORM, 마이그레이션 관리 자동화 |
| PostgreSQL 16 | 안정적인 관계형 DB, Prisma와의 궁합 |

### 인프라 & DevOps
| 기술 | 선택 이유 |
|------|-----------|
| Docker Compose | 로컬 개발과 프로덕션 환경을 동일하게 유지 |
| Traefik v3.3 | 리버스 프록시 + Let's Encrypt HTTPS 자동 발급, nginx 대비 설정 간결 |
| AWS EC2 (t3.micro) | 프리티어 수준 비용, 직접 서버 관리 경험 |
| GitHub Actions | push 이벤트 기반 자동 빌드/배포, GHCR 이미지 관리 |
| Turborepo | 모노레포 빌드 캐싱, 변경된 패키지만 선택적 빌드 |

### 모니터링 & 관측 가능성
| 기술 | 선택 이유 |
|------|-----------|
| Grafana Alloy | 단일 에이전트로 메트릭(Prometheus) + 로그(Loki) 동시 수집, 사이드카로 가볍게 배치 |
| Grafana Cloud (Mimir + Loki) | t3.micro 1GB 환경에서 자체 호스팅 부담 없이 무료 티어로 시각화/저장 위임 |
| `@willsoto/nestjs-prometheus` | NestJS에 Prometheus exporter를 데코레이터 기반으로 통합 |
| Grafana Alerting (Email) | 코드로 관리되는 PromQL 알람 규칙 → 이메일 알림 |

---

## 아키텍처

```
[로컬 git push → main]
        ↓
[GitHub Actions]
  1. web / api Docker 이미지 빌드
  2. ghcr.io/cr0c0-mj/ 에 이미지 push
  3. EC2에 SSH 접속 → docker compose pull & up
        ↓
[AWS EC2 t3.micro — Ubuntu 22.04]
  Traefik (80/443)  ← 외부 트래픽 진입점
    ├─ crocoportfolio.com     → Next.js web (3000)
    ├─ www.crocoportfolio.com → Next.js web (3000)
    └─ api.crocoportfolio.com → NestJS api (4000)
  PostgreSQL (내부 네트워크, 외부 노출 없음)
```

### Docker 네트워크 구조
```
edge (외부 통신)
  └─ traefik ↔ web ↔ api ↔ alloy (→ Grafana Cloud)

internal (DB 격리)
  └─ api ↔ db ↔ alloy (→ /metrics 스크랩)
```

### 모니터링 데이터 흐름
```
[NestJS API]   ──/metrics (Prometheus)──┐
                                        │
[Traefik]      ──access.log (JSON)─────►│   [Alloy]  ── remote_write ──►  [Grafana Cloud]
                                                                            ├─ Mimir (메트릭)
                                                                            └─ Loki  (로그)
                                                                                 ↓
                                                                      Dashboards / Alerting → Email
```

---

## 모노레포 구조

```
apps/
  web/          # Next.js 14 — crocoportfolio.com
  api/          # NestJS 10 — api.crocoportfolio.com
packages/
  ui/           # 공유 React 컴포넌트 (@portfolio/ui)
  tsconfig/     # 공유 TypeScript 설정
  eslint-config/ # 공유 ESLint 설정
docker/
  traefik/
    dynamic/    # Traefik 라우팅 설정 (파일 프로바이더)
    letsencrypt/ # Let's Encrypt 인증서 저장
  alloy/
    config.alloy  # Grafana Alloy 수집기 설정 (메트릭 + 로그)
docs/
  DEPLOYMENT.md     # 배포 전 과정 상세 기록
  MONITORING.md     # 모니터링/알람 구성 가이드
  monitoring/
    alert-rules.yml # PromQL 알람 규칙 (코드로 관리)
compose.yml         # 로컬 개발용
compose.prod.yml    # 프로덕션용
```

---

## 주요 구현 포인트

### 1. Traefik 파일 프로바이더 기반 라우팅
Docker 27의 API 호환성 문제로 Docker 소켓 기반 서비스 디스커버리 대신 **파일 프로바이더**로 전환했습니다. `docker/traefik/dynamic/routes.yml`에 라우팅 규칙을 정적으로 선언하여 안정적인 라우팅을 구현했습니다.

### 2. GitHub Actions CI/CD 파이프라인
- **ci.yml**: PR/push 시 lint → typecheck → build → test 자동 검증
- **deploy.yml**: main 브랜치 push 시 멀티 스테이지 Docker 빌드 → GHCR push → SSH 배포 자동화
- GHCR 이미지명은 반드시 소문자여야 함 → `cr0c0-mj/portfolio-web` 으로 하드코딩

### 3. Next.js App Router + 모노레포 구조 주의사항
`src/pages/` 디렉토리가 존재하면 Next.js가 Pages Router로 인식합니다. App Router와 충돌을 피하기 위해 뷰 컴포넌트 폴더를 `src/views/`로 명명했습니다.

### 4. Let's Encrypt 자동 HTTPS
Traefik의 TLS-ALPN 챌린지 방식으로 `crocoportfolio.com`, `www.crocoportfolio.com`, `api.crocoportfolio.com` 세 도메인에 대한 인증서를 자동 발급/갱신합니다.

### 5. Grafana Alloy 사이드카 기반 모니터링
- **단일 에이전트**: Alloy 컨테이너 하나가 NestJS `/metrics` 스크랩(Prometheus)과 Traefik access log tail(Loki) 둘 다 처리.
- **저장은 위임**: 1GB RAM VPS에서 Prometheus/Loki를 자체 호스팅하지 않고 Grafana Cloud 무료 티어로 원격 쓰기 → VPS는 수집만, 저장/시각화는 외부.
- **로그 라벨링**: Traefik JSON 로그에서 `status`/`method`/`router`를 라벨로 승격해 LogQL 필터 효율화.

### 6. 코드로 관리되는 알람 규칙
[`docs/monitoring/alert-rules.yml`](docs/monitoring/alert-rules.yml)에 5종의 PromQL 알람(API down, 이벤트 루프 지연, 메모리, 5xx 에러율, 트래픽 단절)을 선언적으로 정의 → Grafana Alerting → 이메일 통지. 현재 NestJS 메트릭 기반 3종은 운영 중이고 실제 알람 → Resolved 사이클까지 검증 완료. 자세한 적용 방법은 [`docs/MONITORING.md`](docs/MONITORING.md) 참고.

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 전체 개발 서버 실행 (web: 3000, api: 4000)
npm run dev

# Docker로 실행
docker compose up
```

### 환경변수 설정 (`apps/api/.env`)
```env
DATABASE_URL=postgresql://portfolio:password@localhost:5432/portfolio
```

---

## 배포 구조 상세

→ [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) 참고

---

## 모니터링 & 알람

→ [`docs/MONITORING.md`](docs/MONITORING.md) 참고

요약:
- **메트릭**: Alloy → Grafana Cloud Mimir (Node 런타임, GC, event loop lag)
- **로그**: Traefik access log (JSON) → Alloy → Grafana Cloud Loki (IP, Referer, 응답시간, 상태코드)
- **알람**: PromQL 규칙([`docs/monitoring/alert-rules.yml`](docs/monitoring/alert-rules.yml)) → Grafana Alerting → Email
- **추가 환경변수**: `GRAFANA_REMOTE_WRITE_URL`, `GRAFANA_USERNAME`, `GRAFANA_API_TOKEN`, `LOKI_PUSH_URL`, `LOKI_USERNAME`

### 알람 동작 검증

`docker compose stop api`로 API를 의도적으로 다운시킨 뒤 자동으로 발사·해소되는 사이클을 확인했습니다.

| Firing | Resolved |
|---|---|
| <img src="docs/images/alert-firing.png" alt="Firing alert email" width="420"> | <img src="docs/images/alert-resolved.png" alt="Resolved alert email" width="420"> |

상세 사이클 기록은 [`docs/MONITORING.md`](docs/MONITORING.md#동작-검증--실제-알람-수신-기록) 참고.
