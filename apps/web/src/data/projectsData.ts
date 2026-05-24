import zooflixImg from '../assets/zooflix.png';
import shortorialImg from '../assets/shortorial.png';
import portfolioImg from '../assets/portfolio.png';
import congraduationImg from '../assets/congraduation.webp';

export interface Project {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageContain?: boolean;
  technologies: string[];
  link: string;
  readme: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio',
    date: 'May 2025',
    category: 'Web App, DevOps',
    description:
      'Next.js + NestJS 기반의 개인 포트폴리오 사이트. Turborepo 모노레포 구조, Prisma + PostgreSQL, Docker Compose, Traefik으로 HTTPS 자동 프로비저닝, GitHub Actions CI/CD를 통해 VPS에 자동 배포됩니다.',
    image: portfolioImg.src,
    technologies: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Turborepo', 'Grafana'],
    link: 'https://github.com/Cr0c0-MJ/portfolio',
    readme: `## 개요

개인 포트폴리오 웹사이트로, 프론트엔드부터 인프라까지 전 스택을 직접 구성한 풀스택 프로젝트입니다.
단순한 정적 사이트가 아닌, 실제 프로덕션 수준의 배포 환경을 경험하는 것을 목표로 했습니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | Next.js 14 (App Router), TypeScript, Tailwind CSS v4 |
| 백엔드 | NestJS 10, Prisma ORM, PostgreSQL |
| 모노레포 | Turborepo, npm workspaces |
| 인프라 | Docker Compose, Traefik (Let's Encrypt) |
| CI/CD | GitHub Actions → GHCR → VPS SSH 자동 배포 |
| 모니터링 | Prometheus, Grafana |

## 주요 기능

- **반응형 UI** — 모바일·태블릿·데스크탑 모든 환경 대응
- **다크 모드** — next-themes 기반 시스템 테마 연동
- **프로젝트 모달** — 카드 클릭 시 상세 내용 팝업 표시
- **기술 스택 필터** — 프로젝트를 사용 기술로 필터링
- **블로그** — 마크다운 기반 포스트 관리
- **Contact** — 이메일 문의 폼 (NestJS API 연동)

## 인프라 구조

\`\`\`
GitHub push → GitHub Actions
  → Docker 이미지 빌드 (web / api)
  → GHCR(ghcr.io) 이미지 푸시
  → VPS SSH 접속
  → docker compose pull & up -d
\`\`\`

Traefik이 리버스 프록시로 동작하며 Let's Encrypt TLS 인증서를 자동으로 발급·갱신합니다.

## 모니터링

Prometheus + Grafana 스택으로 서버 및 애플리케이션 상태를 실시간 관측합니다.

\`\`\`
Prometheus  →  수집 (NestJS 메트릭, Node Exporter 시스템 지표)
Grafana     →  시각화 대시보드
\`\`\`

- **시스템 지표** — CPU·메모리·디스크·네트워크 (Node Exporter)
- **애플리케이션 지표** — HTTP 요청 수, 응답 시간, 에러율 (NestJS \`/metrics\`)
- **대시보드** — Grafana로 시계열 그래프 시각화 및 알림 설정

## 모노레포 구조

\`\`\`
apps/
  web/    # Next.js 14 — 포트 3000
  api/    # NestJS 10 — 포트 4000, /api 프리픽스
packages/
  ui/          # 공유 React 컴포넌트
  tsconfig/    # 공유 TypeScript 설정
\`\`\`
`,
  },
  {
    id: 2,
    title: 'Zooflix',
    date: 'February 2024',
    category: 'Web App, FinTech',
    description:
      '구독 경제 모델을 주식 투자에 접목한 플랫폼. 한국투자증권 API를 활용한 월별 자동 주식 매수, AI 기반 외국어 뉴스 번역·음성 합성, 주가 예측 커뮤니티 및 랭킹 기능을 제공합니다.',
    image: zooflixImg.src,
    technologies: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Docker', 'AWS', 'Jenkins'],
    link: 'https://github.com/Cr0c0-MJ/Zooflix',
    readme: `## 개요

**Zooflix**는 구독 경제 모델을 주식 투자에 접목한 FinTech 플랫폼입니다.
넷플릭스처럼 매달 일정 금액을 구독료로 납부하면, 사용자가 선택한 종목에 자동으로 분산 투자해 주는 서비스입니다.

SSAFY 10기 특화 프로젝트 **우수상** 수상작입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React, TypeScript, Recoil, Chart.js |
| 백엔드 | Spring Boot, JPA, MySQL |
| AI / 외부 API | GPT-4, Naver CLOVA, 한국투자증권 OpenAPI |
| 인프라 | AWS EC2, S3, Jenkins, Docker |

## 핵심 기능

### 구독 기반 자동 투자
- 매월 정해진 날짜에 구독 금액만큼 주식을 자동 매수
- 한국투자증권 OpenAPI를 통한 실시간 시세 조회 및 주문 처리
- 분산 투자를 위한 포트폴리오 설정 기능

### AI 뉴스 번역 & 요약
- 해외 경제 뉴스를 GPT-4로 한국어 번역 및 핵심 요약
- Naver CLOVA TTS API로 번역 기사를 음성 변환
- 투자 관련 키워드 자동 태깅

### 주가 예측 커뮤니티
- 사용자들이 종목별 주가 방향(상승/하락)을 예측
- 예측 정확도 기반 랭킹 시스템
- 팔로우 기반 소셜 피드

## 시스템 아키텍처

\`\`\`
React SPA
  ↕ REST API
Spring Boot (EC2)
  ├─ MySQL (RDS)
  ├─ Redis (세션 캐싱)
  └─ 한국투자증권 OpenAPI
           ↓
       Jenkins CI/CD → Docker
\`\`\`
`,
  },
  {
    id: 3,
    title: 'Shortorial',
    date: 'April 2024',
    category: 'Web App, AI',
    description:
      '모션 인식 기반 댄스 학습 서비스. MediaPipe BlazePose를 활용한 실시간 포즈 유사도 분석으로 동작 정확도를 즉시 피드백하고, 챌린지 영상을 YouTube에 바로 업로드할 수 있습니다.',
    image: shortorialImg.src,
    imageContain: true,
    technologies: ['React', 'TypeScript', 'Spring Boot', 'Python', 'MediaPipe', 'MySQL', 'Redis'],
    link: 'https://github.com/Cr0c0-MJ/Shortorial',
    readme: `## 개요

**Shortorial**은 숏폼 챌린지 영상을 따라 춤을 배울 수 있는 AI 댄스 학습 서비스입니다.
웹캠으로 사용자의 동작을 실시간 분석해 원본 영상과의 유사도를 즉시 피드백하고,
완성된 챌린지 영상을 YouTube에 바로 업로드할 수 있습니다.

SSAFY 10기 자율 프로젝트 **우수상** 수상작입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React, TypeScript, MediaPipe BlazePose |
| 백엔드 | Spring Boot, JPA, MySQL, Redis |
| AI | Python, MediaPipe, 코사인 유사도 알고리즘 |
| 외부 API | YouTube Data API v3 |
| 인프라 | AWS EC2, S3, Jenkins, Docker |

## 핵심 기능

### 실시간 포즈 유사도 분석
- MediaPipe BlazePose로 33개 관절 좌표 추출
- 코사인 유사도 알고리즘으로 원본 댄서와 사용자 포즈 비교
- 점수 및 틀린 관절 부위를 즉시 시각적으로 피드백

### 댄스 챌린지 모드
- 원하는 구간을 반복 연습하는 구간 연습 모드
- 전체 챌린지 영상 녹화 및 미리보기
- YouTube API를 통한 챌린지 영상 직접 업로드

### 학습 진행 관리
- 연습 기록 및 점수 히스토리 저장
- 즐겨찾기 챌린지 모아보기
- 인기 챌린지 랭킹

## 포즈 분석 흐름

\`\`\`
웹캠 입력
  → MediaPipe BlazePose (브라우저 내 실행)
  → 33개 관절 좌표 추출
  → 원본 영상 좌표와 코사인 유사도 계산
  → 점수 및 틀린 부위 오버레이 표시
\`\`\`
`,
  },
  {
    id: 4,
    title: 'ConGraduation',
    date: 'January 2024',
    category: 'Web App',
    description:
      '졸업을 축하하는 온라인 사진 롤링페이퍼 서비스. 4컷 형식의 졸업 사진에 메시지를 담아 친구들과 추억을 공유하고, 졸업 당일 이후 열람 및 ZIP 다운로드가 가능합니다.',
    image: congraduationImg.src,
    technologies: ['React', 'Spring Boot', 'MySQL', 'AWS S3', 'WebSocket', 'Docker'],
    link: 'https://github.com/Cr0c0-MJ/congraduation',
    readme: `## 개요

**ConGraduation**은 졸업 시즌을 기념하는 온라인 사진 롤링페이퍼 서비스입니다.
4컷 포토부스 컨셉으로 졸업 사진을 꾸미고, 친구들에게 메시지를 받은 뒤
졸업식 당일 이후 열람할 수 있는 타임캡슐 기능을 제공합니다.

SSAFY 10기 공통 프로젝트입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React, JavaScript, Zustand |
| 백엔드 | Spring Boot, JPA, MySQL |
| 실시간 | WebSocket (STOMP) |
| 스토리지 | AWS S3 (사진 업로드) |
| 인프라 | AWS EC2, Docker, Jenkins |

## 핵심 기능

### 졸업 사진 롤링페이퍼 제작
- 4컷 형식의 사진 프레임에 졸업 사진 업로드
- 스티커, 텍스트, 배경 색상으로 사진 꾸미기
- 완성된 롤링페이퍼 공유 링크 생성

### 타임캡슐 열람 시스템
- 졸업식 날짜를 지정하면 그 전까지 내용 비공개
- D-Day 이후 자동으로 열람 가능 상태로 전환
- 완성된 4컷 사진을 ZIP 파일로 다운로드

### 실시간 메시지
- WebSocket(STOMP)을 통한 방명록 실시간 업데이트
- 친구가 메시지를 남기면 즉시 알림

### 공유 및 소셜 기능
- 카카오톡·링크 공유로 친구 초대
- 친구가 남긴 메시지·스티커 실시간 확인
- 롤링페이퍼 주인공 전용 관리 페이지

## 서비스 흐름

\`\`\`
회원가입 → 롤링페이퍼 생성
  → 사진 업로드 & 꾸미기 (S3 저장)
  → 공유 링크 전송
  → 친구들이 메시지 작성 (WebSocket 실시간)
  → 졸업일 D-Day 이후 열람 & ZIP 다운로드
\`\`\`
`,
  },
];
