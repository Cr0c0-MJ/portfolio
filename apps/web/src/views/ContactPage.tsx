'use client';
import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';

export function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: '이메일',
      value: 'croco9505@gmail.com',
      action: 'Send Email',
      link: 'https://mail.google.com/mail/?view=cm&to=croco9505@gmail.com',
      color: 'text-amber-500',
    },
    {
      icon: MapPin,
      label: '현재 거주지',
      value: '대한민국 인천광역시',
      action: 'View on Map',
      link: 'https://www.google.com/maps/place/인천광역시/@37.4563,126.7052,11z',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="relative z-10 px-4 sm:px-8 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-emerald-400 mb-4">Contact</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">CONTACT</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-10 sm:mb-16 max-w-3xl mx-auto text-sm sm:text-base"
        >
          궁금한 점이 있거나 함께 이야기 나누고 싶은 주제가 있다면 편하게 연락 주세요.<br className="hidden sm:block" />
          프로젝트 협업, 커리어 관련 대화, 혹은 가벼운 안부도 언제든 환영합니다.
        </motion.p>

        {/* How To Connect Section */}
        <div className="relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-foreground mb-2">연락 방법</h2>
            <p className="text-muted-foreground text-sm">언제든 편하게 연락 주세요.</p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group relative bg-card border border-border rounded-2xl p-4 sm:p-6 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    {/* Left side - Icon and Info */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className={`${method.color} mt-1 shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-xs sm:text-sm mb-1">{method.label}</p>
                        <p className="text-foreground text-sm sm:text-base truncate">{method.value}</p>
                      </div>
                    </div>

                    {/* Right side - Action Button */}
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-muted/50 hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400 rounded-lg transition-all duration-300 border border-border hover:border-emerald-500/50 whitespace-nowrap text-xs sm:text-sm"
                    >
                      {method.action}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-10 sm:mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm">
            보통 24시간 이내에 답변드립니다. 연락 기다리겠습니다!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
