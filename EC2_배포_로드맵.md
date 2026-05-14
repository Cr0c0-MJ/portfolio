# 포트폴리오 프로젝트 — EC2 배포 로드맵

> **현재 상태**: Docker Compose / Dockerfile 구성 완료, 로컬 실행 확인 완료  
> **목표**: EC2 + 도메인 연결 → GitHub Actions 자동 배포 → HTTPS 접속 확인

---

## 이 프로젝트의 배포 구조

```
[로컬 push → main 브랜치]
        ↓
[GitHub Actions — .github/workflows/deploy.yml]
  1. web / api Docker 이미지 빌드
  2. GHCR(ghcr.io)에 이미지 push
  3. EC2에 SSH로 접속
  4. compose.prod.yml pull & up
        ↓
[EC2 서버]
  Traefik (80/443) ← 외부 트래픽
    ├─ yourdomain.com → Next.js (web:3000)
    └─ api.yourdomain.com → NestJS (api:4000)
  PostgreSQL (내부 네트워크만, 외부 노출 없음)
```

> ⚠️ 이 프로젝트는 **Traefik**이 리버스 프록시를 담당합니다 (nginx 불필요).  
> ⚠️ 서버에서 직접 빌드하지 않습니다. GitHub Actions가 빌드 후 GHCR에 올리고, 서버는 이미지를 pull만 합니다.  
> ⚠️ **도메인이 필수**입니다. Traefik이 도메인 기반으로 라우팅하고 Let's Encrypt 인증서를 자동 발급합니다.

---

## 전체 흐름 한눈에 보기

```
[STEP 1] AWS EC2 인스턴스 생성
    ↓
[STEP 2] EC2 서버 기본 세팅 (Docker 설치)
    ↓
[STEP 3] 도메인 구매 & DNS 설정
    ↓
[STEP 4] GitHub Secrets 등록
    ↓
[STEP 5] 프로젝트 파일 서버에 올리기 (git clone)
    ↓
[STEP 6] 서버 .env 파일 & Traefik acme.json 설정
    ↓
[STEP 7] 첫 배포 실행 (수동 또는 git push)
    ↓
[STEP 8] 접속 확인 (HTTPS)
```

---

## STEP 1. AWS EC2 인스턴스 생성

### 1-1. EC2 인스턴스 생성
AWS 콘솔 → EC2 → 인스턴스 시작

| 항목 | 선택값 |
|------|--------|
| AMI | Ubuntu 22.04 LTS |
| 인스턴스 유형 | t2.micro (프리티어, 1vCPU / 1GB RAM) |
| 키 페어 | 새로 생성 → `.pem` 파일 저장 (분실 시 재접속 불가) |
| 스토리지 | 20GB 이상 권장 (Docker 이미지 공간 필요, 프리티어 30GB까지 무료) |

> ⚠️ t2.micro는 RAM 1GB로 빌드 시 부족할 수 있습니다. 이 프로젝트는 서버에서 빌드하지 않으므로 문제없습니다.

### 1-2. 보안 그룹 설정 (인바운드 규칙)

| 유형 | 포트 | 소스 | 용도 |
|------|------|------|------|
| SSH | 22 | 내 IP | 서버 접속 |
| HTTP | 80 | 0.0.0.0/0 | Traefik (HTTPS 리다이렉트) |
| HTTPS | 443 | 0.0.0.0/0 | Traefik (실제 서비스) |

> ✅ 3000(web), 4000(api) 포트는 열 필요 없습니다. Traefik이 내부 Docker 네트워크로 연결합니다.  
> ⚠️ SSH(22번)는 반드시 "내 IP"로만 제한하세요.

### 1-3. Elastic IP 할당 (필수)
EC2 콘솔 → 탄력적 IP → 할당 → 인스턴스에 연결

재시작해도 IP가 바뀌지 않게 고정합니다. DNS A 레코드에 이 IP를 등록합니다.

---

## STEP 2. EC2 서버 기본 세팅

### 2-1. SSH 접속
```bash
# .pem 권한 설정 (Mac/Linux)
chmod 400 ~/Downloads/your-key.pem

# 접속
ssh -i ~/Downloads/your-key.pem ubuntu@[EC2 퍼블릭 IP]
```

### 2-2. 서버 패키지 업데이트
```bash
sudo apt update && sudo apt upgrade -y
```

### 2-3. Docker 설치 (최신 버전)
```bash
# 의존성 설치
sudo apt install -y ca-certificates curl gnupg

# Docker 공식 GPG 키 추가
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Docker 저장소 추가
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker Engine + Compose Plugin 설치
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# ubuntu 유저가 sudo 없이 docker 사용
sudo usermod -aG docker ubuntu

# 서비스 자동시작 등록
sudo systemctl enable docker

# 적용을 위해 재접속
exit
ssh -i ~/Downloads/your-key.pem ubuntu@[EC2 퍼블릭 IP]

# 설치 확인
docker --version
docker compose version
```

> ℹ️ `docker-compose` (v1) 대신 `docker compose` (v2 플러그인)를 설치합니다. 이 프로젝트의 GitHub Actions와 동일한 버전입니다.

---

## STEP 3. 도메인 구매 & DNS 설정

이 프로젝트는 Traefik이 **도메인 기반**으로 라우팅하므로 도메인이 필요합니다.

### 3-1. 도메인 구매
가비아 / Namecheap / Cloudflare 등에서 구매 (연 1~3만원 수준)  
예) `yourname.dev`, `croco.dev`

### 3-2. DNS A 레코드 설정
도메인 DNS 관리 페이지에서 아래 3개 레코드 추가:

| 레코드 타입 | 이름 | 값 |
|------------|------|----|
| A | `@` (또는 yourdomain.com) | EC2 Elastic IP |
| A | `www` | EC2 Elastic IP |
| A | `api` | EC2 Elastic IP |

DNS 반영까지 최대 24시간 걸릴 수 있습니다 (보통 수 분 내).

```bash
# DNS 반영 확인
nslookup yourdomain.com
```

---

## STEP 4. GitHub Secrets 등록

GitHub Actions가 자동 배포할 때 사용하는 값들입니다.

GitHub 레포 → Settings → Secrets and variables → Actions → New repository secret

| Secret 이름 | 값 |
|------------|-----|
| `VPS_HOST` | EC2 Elastic IP (예: `3.14.15.92`) |
| `VPS_USER` | `ubuntu` |
| `VPS_SSH_KEY` | `.pem` 파일 전체 내용 (`-----BEGIN RSA PRIVATE KEY-----` 포함) |
| `VPS_PORT` | `22` (선택, 기본값) |
| `VPS_APP_DIR` | 서버에서 프로젝트가 있는 절대 경로 (예: `/home/ubuntu/portfolio`) |

### GitHub Environment 생성 (필수)
GitHub 레포 → Settings → Environments → New environment → 이름: `production`

> ℹ️ `deploy.yml`이 `environment: production`을 명시하고 있어서 이 환경이 없으면 배포 job이 실행되지 않습니다.

---

## STEP 5. 프로젝트 파일 서버에 올리기

```bash
# EC2 서버에서 실행
git clone https://github.com/[본인계정]/portfolio.git
cd portfolio
```

---

## STEP 6. 서버 .env 파일 & Traefik 설정

### 6-1. .env 파일 생성
```bash
# 프로젝트 루트에서 실행
nano .env
```

아래 내용 입력 (값은 실제 환경에 맞게 변경):

```env
# 도메인 & Traefik
DOMAIN=yourdomain.com
ACME_EMAIL=your@email.com

# GHCR (GitHub Container Registry)
GHCR_OWNER=your-github-username
IMAGE_TAG=latest

# Database
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=강력한패스워드입력
POSTGRES_DB=portfolio
DATABASE_URL=postgresql://portfolio:강력한패스워드입력@db:5432/portfolio?schema=public
```

> ⚠️ `POSTGRES_PASSWORD`와 `DATABASE_URL`의 비밀번호를 동일하게 맞춰야 합니다.  
> ⚠️ `.env` 파일은 `.gitignore`에 포함되어 있습니다. 절대 커밋하지 마세요.

### 6-2. Traefik acme.json 파일 생성
Let's Encrypt 인증서 저장 파일입니다. 반드시 권한을 600으로 설정해야 합니다.

```bash
mkdir -p docker/traefik/letsencrypt
touch docker/traefik/letsencrypt/acme.json
chmod 600 docker/traefik/letsencrypt/acme.json
```

> ⚠️ 권한이 600이 아니면 Traefik이 실행을 거부합니다.

---

## STEP 7. 첫 배포 실행

### 방법 A — git push로 자동 배포 (권장)
```bash
# 로컬에서
git push origin main
```
GitHub Actions가 자동으로:
1. `web` / `api` Docker 이미지 빌드 & GHCR push
2. EC2에 SSH 접속 후 `compose.prod.yml`로 서비스 실행

GitHub → Actions 탭에서 진행 상황 확인 가능.

### 방법 B — 서버에서 수동 실행 (첫 설정 확인용)
```bash
# EC2 서버에서 (프로젝트 폴더 안)

# GHCR 로그인 (GitHub 개인 액세스 토큰 필요)
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# 이미지 pull & 실행
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d

# 실행 상태 확인
docker compose -f compose.prod.yml ps
docker compose -f compose.prod.yml logs -f
```

> ℹ️ GitHub 개인 액세스 토큰: GitHub → Settings → Developer settings → Personal access tokens → 권한: `read:packages`

---

## STEP 8. 접속 확인

브라우저에서 접속:
```
https://yourdomain.com       ← Next.js 프론트엔드
https://api.yourdomain.com/api/health  ← NestJS API 헬스체크
```

Traefik이 자동으로 Let's Encrypt 인증서를 발급하므로 HTTPS가 바로 작동합니다.  
인증서 발급은 첫 접속 시 수 초 ~ 1분 정도 걸립니다.

✅ 체크리스트:
- [ ] `https://yourdomain.com` 메인 화면 정상 로딩
- [ ] `https://api.yourdomain.com/api/health` → `{"status":"ok"}` 응답
- [ ] HTTPS 자물쇠 아이콘 표시
- [ ] `http://` 접속 시 `https://`로 자동 리다이렉트
- [ ] 이후 `git push` 시 GitHub Actions 자동 배포 작동 확인

---

## 이후 업데이트 배포 방법

코드 수정 후 main 브랜치에 push하면 자동 배포됩니다.

```bash
git push origin main
# → GitHub Actions 실행 → 이미지 빌드 → EC2 자동 업데이트
```

GitHub Actions 탭에서 배포 진행 상황을 실시간으로 확인할 수 있습니다.

---

## 자주 생기는 문제 & 해결법

| 증상 | 원인 | 해결 |
|------|------|------|
| 브라우저 접속 안 됨 | 보안그룹 80/443 미오픈 | AWS 콘솔 → 보안그룹 인바운드 규칙 확인 |
| Traefik 실행 거부 | acme.json 권한 오류 | `chmod 600 docker/traefik/letsencrypt/acme.json` |
| 인증서 발급 실패 | DNS 미반영 또는 80포트 막힘 | DNS 전파 확인, 80포트 보안그룹 확인 |
| GitHub Actions 배포 실패 | Secrets 누락 또는 오타 | GitHub → Settings → Secrets 값 재확인 |
| `environment: production` 오류 | GitHub Environment 미생성 | GitHub → Settings → Environments → `production` 생성 |
| API 502 Bad Gateway | db 헬스체크 실패 or api 미기동 | `docker compose -f compose.prod.yml logs api` |
| DB 연결 오류 | .env 비밀번호 불일치 | `POSTGRES_PASSWORD`와 `DATABASE_URL` 비밀번호 동일한지 확인 |
| 이미지 pull 실패 | GHCR 로그인 안 됨 | GitHub Actions가 자동 처리하므로 Secrets의 `GITHUB_TOKEN` 권한 확인 |

---

## 참고 — 작업 순서 체크리스트

- [ ] AWS EC2 t2.micro 생성 (Ubuntu 22.04)
- [ ] 보안 그룹 포트 설정 (22, 80, 443)
- [ ] Elastic IP 할당 & 인스턴스 연결
- [ ] SSH 접속 성공
- [ ] Docker + Docker Compose Plugin 설치
- [ ] 도메인 구매
- [ ] DNS A 레코드 3개 등록 (`@`, `www`, `api`)
- [ ] GitHub Secrets 5개 등록
- [ ] GitHub `production` Environment 생성
- [ ] EC2에서 `git clone`
- [ ] `.env` 파일 생성 (6개 필수 항목)
- [ ] `acme.json` 생성 & `chmod 600`
- [ ] `git push` → GitHub Actions 자동 배포 확인
- [ ] `https://yourdomain.com` 접속 확인
- [ ] `https://api.yourdomain.com/api/health` 확인
