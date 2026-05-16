'use client';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="relative z-10 px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-emerald-400 mb-4">About</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">ABOUT</span>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto"
        >
          안녕하세요, 저는 Croco입니다.
          <br></br>
          프론트엔드, 백엔드, 인프라를 넘나드는 풀스택 엔지니어이자, AI를 실무에 깊이 녹여낼 줄 아는 개발자입니다.
        </motion.p>

        {/* Who I Am Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-foreground mb-2">자기 소개</h2>
          <p className="text-muted-foreground text-sm mb-8">안녕하세요. 저를 소개하자면</p>

          {/* Overview Tab */}
          <div className="border-l-2 border-emerald-500 pl-6 mb-6">
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <User className="w-4 h-4" />
              <span>프로젝트 전반을 이해하는 개발자</span>
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                저는 프론트엔드부터 백엔드, 인프라 구축, 배포 자동화까지 제품의 전 과정을 혼자 끌어갈 수 있는
                풀스택 소프트웨어 엔지니어입니다. 팀의 규모나 역할 경계에 구애받지 않고, 필요한 곳에서
                필요한 역할을 맡는 1인 다역에 익숙합니다.
              </p>

              <p>
                UI 설계부터 API 개발, DB 모델링, CI/CD 파이프라인, 서버 운영까지 — 하나의 아이디어가
                실제 서비스로 이어지는 전체 흐름을 이해하고 실행할 수 있다는 것이 제 가장 큰 강점입니다.
                단순히 코드를 짜는 것을 넘어, 제품이 어떻게 동작하고 어디서 무너지는지를 입체적으로 파악합니다.
              </p>

              <p>
                여기에 더해, AI 도구를 적극적으로 활용하는 엔지니어입니다. LLM을 단순한 보조 도구가 아닌
                개발 워크플로우의 핵심 파트너로 삼아, 설계·구현·검증 전 단계에서 활용합니다.
                빠르게 변하는 AI 생태계 속에서 실질적인 가치를 만들어낼 줄 아는 것, 그것이 지금 제가
                가장 집중하고 있는 경쟁력입니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Sections Placeholder */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* You can add more sections here */}
        </motion.div>
      </div>
    </div>
  );
}
