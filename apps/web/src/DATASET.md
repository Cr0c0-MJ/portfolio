# 포트폴리오 사이트 데이터셋

## 📊 전체 구조

### 라우팅 구조
- `/` - 홈 페이지
- `/about` - About 페이지
- `/projects` - Projects 페이지
- `/contact` - Contact 페이지
- `/blog` - Blog 페이지

---

## 🎨 디자인 시스템

### 컬러 스킴
- **배경색**: `#1a1f2e` (어두운 네이비)
- **보조 배경색**: `#0f1419` (더 어두운 배경)
- **포인트 컬러**: Emerald (녹색) - `emerald-400`, `emerald-500`
- **액센트 컬러**: Amber (호박색) - `amber-500`
- **텍스트 컬러**: 
  - Primary: `white`
  - Secondary: `gray-300`
  - Tertiary: `gray-400`

### 주요 디자인 요소
- 별 애니메이션 배경 (`StarBackground` 컴포넌트)
- 그라데이션 구분선: `from-transparent via-emerald-500/50 to-transparent`
- 원형 프로필 이미지 with 펄스 애니메이션
- 블러 효과 (`backdrop-blur-sm`)
- 호버 효과 및 트랜지션 애니메이션

---

## 👤 개인 정보

### 기본 정보
```javascript
{
  name: "Croco",
  title: "Software Engineer",
  tagline: "호기심 많은 개발자",
  intro: "안녕하세요, 저는 Croco입니다 — 깊은 사고와 실용적이고 실제로 작동하는 소프트웨어를 만드는 것을 즐기는 소프트웨어 엔지니어입니다.",
  location: "Seoul, South Korea",
  baseLocations: ["Amsterdam", "Barcelona"],
  regions: ["Europe", "USA", "Middle East"],
  background: "Lebanese-Spanish",
  lifestyle: "Digital Nomad"
}
```

### About - Overview 텍스트
```
저는 호기심 많은 사람이자 문제 해결사입니다. 기술에 대한 깊은 열정으로 움직이며, 
어린 나이부터 프로그래밍에 빠져들었습니다. 매혹적인 컴퓨터를 상상력에 맞춰 구부리려고 
노력하면서, 그 호기심은 빠르게 소프트웨어 엔지니어링과 제품 개발에 대한 평생의 헌신으로 발전했습니다.

그 이후로 코딩은 무한한 창의성을 위한 제가 가장 좋아하는 놀이터가 되었습니다. 
오늘날, 제 작업은 글로벌한 범위를 가지고 있습니다. 암스테르담과 바르셀로나를 기반으로 하면서 
유럽 전역의 팀들과 긴밀히 협력하고 있으며, 제 영향력은 미국과 중동의 강력한 파트너십으로 확장됩니다.

이러한 국제적 관점은 레바논-스페인 배경과 디지털 노마드 라이프스타일에 깊이 뿌리를 두고 있습니다. 
환경에 관계없이 성공을 정의하는 보편적인 패턴을 볼 수 있도록 가르쳐주었으며, 
지금은 지속적인 진정한 영향을 만드는 데 초점을 맞춘 최첨단 기술을 구축하는 팀을 
역량 강화하는 데 그 관점을 활용하고 있습니다. 이 사이트는 그 여정의 작은 창입니다.
```

### 연락처 정보
```javascript
{
  email: "croco@example.com",
  phone: "(+82) 10 1234 5678",
  location: "Seoul, South Korea",
  meetingPlatform: "Google Meet",
  responseTime: "Usually respond within 24 hours"
}
```

---

## 💼 Projects 데이터셋

총 **6개 프로젝트**

### 프로젝트 목록

#### 1. AI Integration Platform
```javascript
{
  id: 1,
  title: 'AI Integration Platform',
  date: 'October 2023',
  category: 'Web App, SDK, API, Website, Docs',
  description: 'A plug-and-play platform for integrating an AI-powered voice user interface (VUI) directly on top of existing applications. It is designed...',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  technologies: ['React', 'TypeScript', 'Node.js', 'LangChain', 'FastMCP', 'PineconeDB'],
  badge: 31
}
```

#### 2. AI Sales Agent for Shopify
```javascript
{
  id: 2,
  title: 'AI Sales Agent for Shopify',
  date: 'July 2025',
  category: 'Shopify App',
  description: 'A native app for Shopify stores that can be installed in minutes, delivering an assistant experience directly inside the merchant...',
  image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
  technologies: ['NextJS', 'OpenAI', 'GraphQL', 'Shopify API'],
  badge: 29
}
```

#### 3. AI Browsing Assistant
```javascript
{
  id: 3,
  title: 'AI Browsing Assistant',
  date: 'February 2024',
  category: 'Browser Extension',
  description: 'A browser extension that brings voice control and AI-powered assistance to your web browsing experience. This tool transforms...',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  technologies: ['Plasmo', 'Ant Design', 'OpenAI', 'Chrome API'],
  badge: 18
}
```

#### 4. E-commerce Dashboard
```javascript
{
  id: 4,
  title: 'E-commerce Dashboard',
  date: 'March 2024',
  category: 'Web App',
  description: 'A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization and insights...',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  technologies: ['React', 'TypeScript', 'GraphQL', 'D3.js'],
  badge: 24
}
```

#### 5. Mobile Fitness Tracker
```javascript
{
  id: 5,
  title: 'Mobile Fitness Tracker',
  date: 'January 2024',
  category: 'Mobile App',
  description: 'A React Native mobile application for tracking workouts, nutrition, and health metrics with personalized AI coaching...',
  image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
  technologies: ['React Native', 'Node.js', 'MongoDB', 'OpenAI'],
  badge: 15
}
```

#### 6. Content Management System
```javascript
{
  id: 6,
  title: 'Content Management System',
  date: 'December 2023',
  category: 'Web App, CMS',
  description: 'A headless CMS built with modern technologies, offering flexible content modeling and powerful API...',
  image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=600&fit=crop',
  technologies: ['NextJS', 'PostgreSQL', 'GraphQL', 'Prisma'],
  badge: 28
}
```

### 기술 스택 통계
- **React**: 3 프로젝트
- **TypeScript**: 3 프로젝트
- **Node.js**: 2 프로젝트
- **GraphQL**: 3 프로젝트
- **NextJS**: 2 프로젝트
- **OpenAI**: 3 프로젝트
- **LangChain**: 1 프로젝트
- **FastMCP**: 1 프로젝트
- **PineconeDB**: 1 프로젝트
- **Shopify API**: 1 프로젝트
- **Plasmo**: 1 프로젝트
- **Ant Design**: 1 프로젝트
- **Chrome API**: 1 프로젝트
- **D3.js**: 1 프로젝트
- **React Native**: 1 프로젝트
- **MongoDB**: 1 프로젝트
- **PostgreSQL**: 1 프로젝트
- **Prisma**: 1 프로젝트

---

## 📝 Blog 데이터셋

총 **8개 아티클**

### 블로그 포스트 목록

#### 1. How JAX Turns Ordinary Python Into a Transformation Machine
```javascript
{
  id: 1,
  title: 'How JAX Turns Ordinary Python Into a Transformation Machine',
  description: "What does it really mean for JAX to 'transform' ordinary Python into a transformation machine? This walks through how that shift changes how you think about code.",
  date: 'November 27, 2025',
  readTime: '35m read',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  category: 'AI',
  tags: ['#JAX', '#Python', '#MachineLearning', '#Programming']
}
```

#### 2. Batching Tokens Without Losing Your Mind
```javascript
{
  id: 2,
  title: 'Batching Tokens Without Losing Your Mind',
  description: "Working on high-throughput AI and juggling batching logic? 'Batching Tokens Without Losing Your Mind' breaks down how to stay fast without drowning in complexity.",
  date: 'November 25, 2025',
  readTime: '35m read',
  image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
  category: 'AI',
  tags: ['#AI', '#LLM', '#inference', '#scaling']
}
```

#### 3. Understanding React Server Components
```javascript
{
  id: 3,
  title: 'Understanding React Server Components',
  description: 'A deep dive into React Server Components and how they change the way we think about building React applications in the modern web.',
  date: 'November 20, 2025',
  readTime: '28m read',
  image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop',
  category: 'Web Development',
  tags: ['#React', '#NextJS', '#ServerComponents', '#WebDev']
}
```

#### 4. The Future of TypeScript: Type System Evolution
```javascript
{
  id: 4,
  title: 'The Future of TypeScript: Type System Evolution',
  description: 'Exploring the latest TypeScript features and how the type system continues to evolve to meet modern development needs.',
  date: 'November 15, 2025',
  readTime: '22m read',
  image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop',
  category: 'Web Development',
  tags: ['#TypeScript', '#JavaScript', '#Programming']
}
```

#### 5. Building Scalable APIs with GraphQL
```javascript
{
  id: 5,
  title: 'Building Scalable APIs with GraphQL',
  description: 'Learn best practices for designing and implementing GraphQL APIs that scale with your application needs.',
  date: 'November 10, 2025',
  readTime: '30m read',
  image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
  category: 'Backend',
  tags: ['#GraphQL', '#API', '#Backend', '#WebDev']
}
```

#### 6. Design Systems: From Concept to Implementation
```javascript
{
  id: 6,
  title: 'Design Systems: From Concept to Implementation',
  description: 'A comprehensive guide to building and maintaining design systems that empower teams and ensure consistency.',
  date: 'November 5, 2025',
  readTime: '25m read',
  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  category: 'Design',
  tags: ['#DesignSystems', '#UX', '#UI', '#Frontend']
}
```

#### 7. Optimizing Performance in Large React Applications
```javascript
{
  id: 7,
  title: 'Optimizing Performance in Large React Applications',
  description: 'Practical strategies for identifying and fixing performance bottlenecks in complex React applications.',
  date: 'October 30, 2025',
  readTime: '32m read',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  category: 'Web Development',
  tags: ['#React', '#Performance', '#Optimization']
}
```

#### 8. Database Indexing Strategies for Modern Apps
```javascript
{
  id: 8,
  title: 'Database Indexing Strategies for Modern Apps',
  description: 'Understanding when and how to use database indexes to improve query performance without sacrificing write speed.',
  date: 'October 25, 2025',
  readTime: '27m read',
  image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
  category: 'Backend',
  tags: ['#Database', '#SQL', '#Performance', '#Backend']
}
```

### 카테고리별 통계
- **AI**: 2 아티클
- **Web Development**: 3 아티클
- **Backend**: 2 아티클
- **Design**: 1 아티클

### 평균 읽기 시간
약 **29분**

---

## 🔗 내비게이션 및 메뉴

### 헤더 내비게이션
```javascript
[
  { icon: Home, label: "Home", path: "/" },
  { icon: User, label: "About", path: "/about" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: Mail, label: "Contact", path: "/contact" },
  { icon: BookOpen, label: "Blog", path: "/blog" }
]
```

### 사이드 메뉴 항목
```javascript
[
  { icon: Home, label: "Home" },
  { icon: User, label: "About" },
  { icon: Briefcase, label: "Services" },
  { icon: Star, label: "Testimonials" },
  { icon: Code, label: "Contributions" },
  { icon: FolderOpen, label: "Projects" },
  { icon: Layers, label: "Stack" },
  { icon: Camera, label: "Moments" },
  { icon: Mail, label: "Contact" },
  { icon: BookOpen, label: "Books" },
  { icon: FileText, label: "Blog" },
  { icon: FileText, label: "Logs" }
]
```

---

## 🌐 소셜 미디어 & 링크

### Footer 링크
- **API Docs**: `#` (placeholder)
- **Privacy**: `#` (placeholder)
- **LinkedIn**: `https://linkedin.com`
- **GitHub**: `https://github.com`
- **Twitter/X**: `https://twitter.com`

### 버전 정보
- **Version**: v7.2
- **Build ID**: dc26v4f2
- **Copyright**: © 2019 - 2025
- **Credits**: Designed & Developed by Croco

---

## 🎭 연락 방법

### Contact Methods
```javascript
[
  {
    icon: Mail,
    label: 'By Email',
    value: 'croco@example.com',
    action: 'Send Email',
    link: 'mailto:croco@example.com',
    color: 'text-amber-500'
  },
  {
    icon: Video,
    label: 'Virtual Meeting',
    value: 'Google Meet',
    action: 'Schedule a Call',
    link: '#',
    color: 'text-amber-500'
  },
  {
    icon: Phone,
    label: 'By Phone or WhatsApp',
    value: '(+82) 10 1234 5678',
    action: 'Send Message',
    link: 'tel:+821012345678',
    color: 'text-amber-500'
  },
  {
    icon: MapPin,
    label: 'Physical Meeting',
    value: 'Seoul, South Korea',
    action: 'View on Map',
    link: '#',
    color: 'text-amber-500'
  }
]
```

---

## 🛠 기술 스택

### 프론트엔드
- **Framework**: React
- **Routing**: React Router
- **Animation**: Motion (Framer Motion)
- **Styling**: Tailwind CSS v4.0
- **Icons**: Lucide React

### 컴포넌트 구조
```
/App.tsx (메인 라우터)
/components/
  - Header.tsx
  - Footer.tsx
  - SideMenu.tsx
  - HeroSection.tsx
  - StarBackground.tsx
  - ProjectCard.tsx
  - BlogCard.tsx
/pages/
  - HomePage.tsx
  - AboutPage.tsx
  - ProjectsPage.tsx
  - BlogPage.tsx
  - ContactPage.tsx
```

---

## 📊 통계 요약

- **총 페이지**: 5개
- **총 프로젝트**: 6개
- **총 블로그 포스트**: 8개
- **사용된 기술 스택**: 18종
- **연락 방법**: 4가지
- **소셜 미디어 링크**: 3개

---

이 데이터셋은 2025년 12월 13일 기준으로 작성되었습니다.
