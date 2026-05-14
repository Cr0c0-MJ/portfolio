'use client';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import profileImage from '@/assets/profile_1.png';

export function HeroSection() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-8">
      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="relative w-64 h-64 rounded-full overflow-hidden ring-4 ring-emerald-500/50">
          <ImageWithFallback
            src={profileImage.src}
            alt="Profile"
            className="w-full h-full object-cover"
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
        className="text-amber-500 mb-4"
      >
        Croco
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-white mb-6 text-center"
      >
        <span className="text-amber-500">Software</span> Engineer
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-emerald-400 text-center max-w-2xl"
      >
        Genenalist, 두루 갖춘 개발자
      </motion.p>
    </div>
  );
}
