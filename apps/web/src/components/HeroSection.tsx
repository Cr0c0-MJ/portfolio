'use client';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import profileImage from '@/assets/profile_1.png';

export function HeroSection() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-8">
      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-emerald-500/50">
          <ImageWithFallback
            src={profileImage.src}
            alt="Profile"
            className="object-cover"
            priority
            sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 256px"
          />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-500"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-amber-500 mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl"
      >
        Croco
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-foreground mb-4 sm:mb-6 text-center text-xl sm:text-2xl md:text-3xl"
      >
        <span className="text-amber-500">Software</span> Engineer
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-emerald-400 text-center max-w-2xl text-sm sm:text-base px-4"
      >
        Genenalist, 두루 갖춘 개발자
      </motion.p>
    </div>
  );
}
