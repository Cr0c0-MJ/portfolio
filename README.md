# Croco Portfolio

> 개인 포트폴리오 웹사이트 — Next.js + NestJS + Docker + AWS EC2

**라이브:** https://crocoportfolio.com  
**API:** https://api.crocoportfolio.com/api/health

---

## 프로젝트 소개

풀스택 개인 포트폴리오 사이트입니다. 단순히 코드를 작성하는 것을 넘어 **도메인 구매 → DNS 설정 → EC2 서버 구성 → HTTPS 자동화 → CI/CD 파이프라인 구축**까지 배포 전 과정을 직접 구현했습니다.

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
  └─ traefik ↔ web ↔ api

internal (DB 격리)
  └─ api ↔ db
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
