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
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
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
          className="text-center text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          안녕하세요, 저는 Croco입니다 — 깊은 사고와 실용적이고 실제로 작동하는 소프트웨어를 만드는 것을 즐기는 소프트웨어 엔지니어입니다.
        </motion.p>

        {/* Who I Am Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-white mb-2">Who I Am</h2>
          <p className="text-gray-400 text-sm mb-8">My story and background.</p>

          {/* Overview Tab */}
          <div className="border-l-2 border-emerald-500 pl-6 mb-6">
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <User className="w-4 h-4" />
              <span>Overview</span>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                저는 호기심 많은 사람이자 문제 해결사입니다. 기술에 대한 깊은 열정으로 움직이며, 
                어린 나이부터 프로그래밍에 빠져들었습니다. 매혹적인 컴퓨터를 상상력에 맞춰 구부리려고 
                노력하면서, 그 호기심은 빠르게 소프트웨어 엔지니어링과 제품 개발에 대한 평생의 헌신으로 발전했습니다.
              </p>

              <p>
                그 이후로 코딩은 무한한 창의성을 위한 제가 가장 좋아하는 놀이터가 되었습니다. 
                오늘날, 제 작업은 글로벌한 범위를 가지고 있습니다. 암스테르담과 바르셀로나를 기반으로 하면서 
                유럽 전역의 팀들과 긴밀히 협력하고 있으며, 제 영향력은 미국과 중동의 강력한 파트너십으로 확장됩니다.
              </p>

              <p>
                이러한 국제적 관점은 레바논-스페인 배경과 디지털 노마드 라이프스타일에 깊이 뿌리를 두고 있습니다. 
                환경에 관계없이 성공을 정의하는 보편적인 패턴을 볼 수 있도록 가르쳐주었으며, 
                지금은 지속적인 진정한 영향을 만드는 데 초점을 맞춘 최첨단 기술을 구축하는 팀을 
                역량 강화하는 데 그 관점을 활용하고 있습니다. 이 사이트는 그 여정의 작은 창입니다.
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
