# 배포 과정 기록 — crocoportfolio.com

> 이 문서는 AWS EC2 + Docker + Traefik + GitHub Actions를 이용한 배포 전 과정과  
> 실제로 겪었던 문제들 및 해결 방법을 상세히 기록합니다.

---

## 배포 아키텍처 최종 구성

```
[git push → main]
      ↓
[GitHub Actions — .github/workflows/deploy.yml]
  Step 1. Docker 이미지 빌드 (멀티스테이지)
  Step 2. ghcr.io/cr0c0-mj/portfolio-{web,api}:sha-xxxxxxx 로 push
  Step 3. appleboy/ssh-action → EC2 SSH 접속
  Step 4. git pull → docker compose -f compose.prod.yml pull && up -d
      ↓
[AWS EC2 t3.micro — ap-northeast-2 (서울)]
  OS: Ubuntu 22.04 LTS
  Docker 27.x + Docker Compose Plugin v2

  Traefik v3.3 (80, 443 포트)
    ├─ crocoportfolio.com     → web:3000
    ├─ www.crocoportfolio.com → web:3000
    └─ api.crocoportfolio.com → api:4000

  PostgreSQL 16 (internal 네트워크, 외부 비노출)
```

---

## STEP별 진행 과정

### STEP 1. AWS EC2 인스턴스 생성

| 항목 | 설정값 |
|------|--------|
| AMI | Ubuntu 22.04 LTS |
| 인스턴스 유형 | **t3.micro** (2vCPU / 1GB RAM) |
| 스토리지 | 20GB gp3 |
| 키 페어 | `Croco_portfolio.pem` 생성 후 저장 |
| Elastic IP | 할당 후 인스턴스에 연결 → `54.116.63.99` 고정 |

**보안 그룹 인바운드 규칙:**

| 유형 | 포트 | 소스 | 비고 |
|------|------|------|------|
| SSH | 22 | 0.0.0.0/0 | GitHub Actions 배포를 위해 전체 오픈 |
| HTTP | 80 | 0.0.0.0/0 | Traefik HTTPS 리다이렉트용 |
| HTTPS | 443 | 0.0.0.0/0 | 실제 서비스 트래픽 |

> ⚠️ SSH를 0.0.0.0/0으로 열어둔 이유: GitHub Actions 러너 IP가 매 실행마다 달라지기 때문.  
> 키 파일(.pem) 없이는 접속이 불가능하므로 실질적 보안 위험은 낮으나,  
> 추후 개선 시 GitHub Meta API의 IP 범위로 제한 권장.

---

### STEP 2. EC2 서버 기본 세팅

```bash
# 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# Docker 공식 설치 (apt 기본 패키지 아님 — 반드시 공식 스크립트 사용)
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# ubuntu 유저 docker 그룹 추가 (sudo 없이 사용)
sudo usermod -aG docker ubuntu
sudo systemctl enable docker

# 재접속 후 확인
docker --version        # Docker version 27.x.x
docker compose version  # Docker Compose version v2.x.x
```

---

### STEP 3. 도메인 구매 & DNS 설정

- **도메인**: `crocoportfolio.com` — 가비아에서 구매 (1년)
- **DNS 프로바이더**: 가비아 DNS 관리

**A 레코드 3개 등록 (Elastic IP 기준):**

| 타입 | 호스트 | 값 | TTL |
|------|--------|-----|-----|
| A | `@` | `54.116.63.99` | 600 |
| A | `www` | `54.116.63.99` | 600 |
| A | `api` | `54.116.63.99` | 600 |

**DNS 반영 확인 (PowerShell):**
```powershell
nslookup crocoportfolio.com
nslookup www.crocoportfolio.com
nslookup api.crocoportfolio.com
# 셋 다 54.116.63.99 응답 확인
```

---

### STEP 4. GitHub Secrets 등록

GitHub 레포 → Settings → Secrets and variables → Actions

| Secret | 값 |
|--------|----|
| `VPS_HOST` | `54.116.63.99` |
| `VPS_USER` | `ubuntu` |
| `VPS_SSH_KEY` | `Croco_portfolio.pem` 파일 전체 내용 |
| `VPS_PORT` | `22` |
| `VPS_APP_DIR` | `/home/ubuntu/portfolio` |

**GitHub Environment 생성:**  
Settings → Environments → New environment → 이름: `production`

> `deploy.yml`이 `environment: production`을 명시하므로 이 환경이 없으면 배포 job 자체가 실행되지 않음.

---

### STEP 5. 서버에 프로젝트 클론

```bash
cd /home/ubuntu

# GitHub 비밀번호 인증 불가 → Personal Access Token(PAT) 사용
# GitHub → Settings → Developer settings → Personal access tokens → repo 권한
git clone https://Cr0c0-MJ:[PAT토큰]@github.com/Cr0c0-MJ/portfolio.git
cd portfolio
```

---

### STEP 6. 서버 환경변수 & Traefik 설정

```bash
# .env 파일 생성
nano .env
```

```env
DOMAIN=crocoportfolio.com
ACME_EMAIL=zaq1308@gmail.com
GHCR_OWNER=cr0c0-mj
IMAGE_TAG=latest
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=[강력한비밀번호]
POSTGRES_DB=portfolio
DATABASE_URL=postgresql://portfolio:[강력한비밀번호]@db:5432/portfolio?schema=public
```

```bash
# Let's Encrypt 인증서 저장 파일 (권한 600 필수)
mkdir -p docker/traefik/letsencrypt
touch docker/traefik/letsencrypt/acme.json
chmod 600 docker/traefik/letsencrypt/acme.json
```

---

## 발생했던 문제 & 해결 과정

### 문제 1. PEM 파일명 오타로 SSH 접속 불가

**증상:**
```
Warning: Identity file Croco_portfoilo.pem not accessible: No such file or directory.
```

**원인:** 파일명 오타 — `portfoilo` (o와 i 순서 바뀜)

**해결:** 실제 파일명 `Croco_portfolio.pem` 확인 후 수정

---

### 문제 2. Windows에서 PEM 파일 권한 오류

**증상:**
```
Bad permissions. Try removing permissions for user: DESKTOP-R3CFCN6\CodexSandboxUsers
WARNING: UNPROTECTED PRIVATE KEY FILE!
```

**원인:** Windows에서 PEM 파일에 다른 사용자(CodexSandboxUsers) 권한이 존재.  
Linux의 `chmod 400`은 Windows PowerShell에서 작동하지 않음.

**해결 (PowerShell `icacls` 사용):**
```powershell
# 상속 제거 후 현재 사용자만 읽기 권한 부여
icacls "C:\...\Croco_portfolio.pem" /inheritance:r
icacls "C:\...\Croco_portfolio.pem" /grant "${env:USERNAME}:R"
```

---

### 문제 3. 다른 PC에서 SSH 접속 불가 (Connection timed out)

**증상:**
```
ssh: connect to host 54.116.63.99 port 22: Connection timed out
```

**원인:** EC2 보안 그룹의 SSH 인바운드 규칙이 기존 PC의 IP로만 제한되어 있었음.

**해결:** AWS 콘솔 → 보안 그룹 → SSH 소스를 `0.0.0.0/0`으로 변경

---

### 문제 4. GitHub Actions에서 SSH 접속 타임아웃

**증상:**
```
2026/05/15 06:46:36 dial tcp ***:***: i/o timeout
Error: Process completed with exit code 1.
```

**원인:** GitHub Actions 러너는 Microsoft Azure에서 실행되며 IP가 매번 바뀜.  
보안 그룹에 GitHub Actions 서버 IP가 허용되지 않았음.

**해결:** SSH 인바운드 규칙 소스를 `0.0.0.0/0`으로 변경

---

### 문제 5. GHCR 이미지명 대소문자 오류

**증상:**
```
buildx failed with: ERROR: invalid tag "ghcr.io/Cr0c0-MJ/portfolio-web:latest":
repository name must be lowercase
```

**원인:** `github.repository_owner` 변수가 `Cr0c0-MJ`를 반환하는데,  
GHCR(GitHub Container Registry)은 이미지명에 소문자만 허용.

**해결:** `deploy.yml`에서 이미지명을 소문자로 하드코딩
```yaml
env:
  IMAGE_WEB: cr0c0-mj/portfolio-web
  IMAGE_API: cr0c0-mj/portfolio-api
```

---

### 문제 6. ESLint 설정 파일 누락 (api, ui 패키지)

**증상:**
```
ESLint couldn't find a configuration file.
@portfolio/api#lint: command exited (2)
@portfolio/ui#lint: command exited (2)
```

**원인:** 모노레포 초기 설정 시 `apps/api`와 `packages/ui`에 ESLint 설정 파일이 없었음.

**해결:** 각 패키지에 `.eslintrc.js` 생성 + `@typescript-eslint` 패키지 추가
```js
// apps/api/.eslintrc.js, packages/ui/.eslintrc.js 동일 구조
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended'],
  // ...
};
```

---

### 문제 7. JSX 내 따옴표(apostrophe) 빌드 오류

**증상:**
```
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.
react/no-unescaped-entities
```

**원인:** JSX 텍스트 내에 `'` 문자를 그대로 사용 (`I'd`, `it's`, `Let's`, `I've`, `Croco's`)  
`next/core-web-vitals` ESLint 설정이 이를 오류로 처리.

**해결:** HTML 엔티티로 이스케이프
```tsx
// 수정 전
<span>Croco's Portfolio</span>
// 수정 후
<span>Croco&apos;s Portfolio</span>
```

---

### 문제 8. Next.js pages/ 디렉토리 라우팅 충돌

**증상:**
```
Build optimization failed: found pages without a React Component as default export in
pages/AboutPage
pages/BlogPage
pages/ContactPage
pages/HomePage
pages/ProjectsPage
```

**원인:** 프로젝트가 App Router(`src/app/`)를 사용하는데,  
뷰 컴포넌트를 `src/pages/`에 두어 Next.js가 이를 Pages Router 페이지로 인식.  
Pages Router 페이지는 `default export`가 필수인데 없었기 때문.

**해결:** 뷰 컴포넌트 폴더명 변경 + import 경로 수정
```bash
mv apps/web/src/pages apps/web/src/views
```
```tsx
// 수정 전
import { AboutPage } from '@/pages/AboutPage';
// 수정 후
import { AboutPage } from '@/views/AboutPage';
```

---

### 문제 9. Traefik + Docker 27 API 버전 호환성 문제 (가장 까다로운 문제)

**증상:**
```
ERR Failed to retrieve information of the docker client and server host
error="Error response from daemon: client version 1.24 is too old.
Minimum supported API version is 1.40, please upgrade your client to a newer version"
```

**원인 분석:**
- Docker 27 (2024년 출시)에서 최소 지원 Docker API 버전이 `1.24 → 1.40`으로 상향됨
- Traefik의 Docker 프로바이더가 초기 연결 시 API 버전 `1.24`를 사용 → Docker 27이 거부
- `DOCKER_API_VERSION=1.41` 환경변수 설정 시도 → Traefik 내부 Go 클라이언트가 무시
- Traefik `v3.1 → v3.3` 업그레이드 시도 → 동일 문제 발생

**최종 해결: Docker 소켓 프로바이더 제거 → 파일 프로바이더로 전환**

Docker 소켓을 통한 서비스 자동 디스커버리 대신, 라우팅 규칙을 정적 파일로 선언.

```yaml
# compose.prod.yml — Traefik 설정 변경
command:
  - --providers.file.directory=/etc/traefik/dynamic  # 파일 프로바이더만 사용
  - --providers.file.watch=true
  # --providers.docker=true 제거
  # Docker 소켓 볼륨 마운트 제거
```

```yaml
# docker/traefik/dynamic/routes.yml 신규 생성
http:
  routers:
    web:
      rule: "Host(`crocoportfolio.com`) || Host(`www.crocoportfolio.com`)"
      entrypoints: [websecure]
      tls:
        certResolver: le
      service: web
    api:
      rule: "Host(`api.crocoportfolio.com`)"
      entrypoints: [websecure]
      tls:
        certResolver: le
      service: api
  services:
    web:
      loadBalancer:
        servers:
          - url: "http://web:3000"
    api:
      loadBalancer:
        servers:
          - url: "http://api:4000"
```

**파일 프로바이더의 장점:**
- Docker API 버전 의존성 없음
- Docker 소켓 마운트 불필요 → 보안 향상
- 라우팅 규칙이 코드로 명시적 관리됨

---

## GitHub Actions clone 시 인증 방법

GitHub는 2021년부터 비밀번호 인증을 폐지했습니다. PAT(Personal Access Token)를 사용해야 합니다.

```bash
# 잘못된 방법 (비밀번호 입력 → 실패)
git clone https://github.com/Cr0c0-MJ/portfolio.git

# 올바른 방법 (PAT 포함)
git clone https://Cr0c0-MJ:[PAT]@github.com/Cr0c0-MJ/portfolio.git
```

PAT 발급: GitHub → Settings → Developer settings → Personal access tokens → `repo` 권한 체크

---

## 배포 후 확인 체크리스트

```bash
# 컨테이너 상태 확인
docker compose -f compose.prod.yml ps

# Traefik 로그 확인 (에러 없이 200 응답만 나와야 함)
docker compose -f compose.prod.yml logs traefik --tail=30

# API 헬스체크
curl https://api.crocoportfolio.com/api/health
# → {"status":"ok"}

# 인증서 상태 확인
docker compose -f compose.prod.yml logs traefik | grep acme
```

---

## 배포 없이 main에 push하기

문서 수정, README 업데이트 등 코드 변경이 없을 때는 GitHub Actions를 실행하지 않고 main에 바로 올릴 수 있습니다.

```bash
git add .
git commit -m "docs: 변경 내용 [skip ci]"
git push origin main
```

커밋 메시지에 `[skip ci]`를 포함하면 CI/CD가 트리거되지 않습니다.  
GitHub 공식 지원 기능이며 `[skip actions]`도 동일하게 작동합니다.

---

## 트러블슈팅 빠른 참조

| 증상 | 원인 | 해결 |
|------|------|------|
| `No such file or directory` (pem) | 파일명 오타 | 실제 파일명 확인 |
| `UNPROTECTED PRIVATE KEY FILE` | Windows 파일 권한 문제 | `icacls` 로 권한 수정 |
| `Connection timed out` | 보안 그룹 SSH 차단 | 인바운드 규칙에 22번 포트 추가 |
| `repository name must be lowercase` | GHCR 대문자 불허 | 이미지명 소문자로 하드코딩 |
| `found pages without a React Component` | App Router + pages/ 디렉토리 충돌 | `src/views/`로 이름 변경 |
| `client version 1.24 is too old` | Traefik + Docker 27 API 버전 충돌 | Traefik 파일 프로바이더로 전환 |
| `acme.json permission error` | 권한 600 미설정 | `chmod 600 acme.json` |
| `denied` (GHCR pull) | 서버에서 GHCR 로그인 안 됨 | GitHub Actions가 자동 처리, 수동 시 PAT 사용 |
