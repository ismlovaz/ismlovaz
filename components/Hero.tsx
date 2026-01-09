"use client";

import { motion } from 'framer-motion';
import Image from "next/image";
import heroImage from '@/assets/3d-man.png';
import { Linkedin } from 'lucide-react';
import handIcon from '@/assets/2.avif';
import { useTranslations } from 'next-intl';
import { useUpworkMode } from '@/hooks/useUpworkMode';

export const Hero = () => {
  const t = useTranslations('Hero');
  const isUpworkMode = useUpworkMode();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-12 font-mono">

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-6">

        {/* 3D Character */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center w-full"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={heroImage}
                alt="Aziz"
                className="w-64 md:w-80 h-auto object-contain grayscale"
                priority
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                scale: { duration: 0.5, delay: 0.8 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
              className="absolute -right-12 top-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 px-4 py-2 rounded-full shadow-lg hidden md:block"
            >
              <p className="text-xs font-semibold tracking-tight">Full-stack engineer 👨🏻‍🎓</p>
            </motion.div>
          </div>

          {/* Separator Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-64 h-px bg-black mt-0 dark:bg-white origin-center"
          />
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center w-full mt-6"
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-1">
            {t('greeting')}
          </p>
          <h1 className="text-5xl md:text-8xl lg:text-5xl font-normal tracking-tighter text-foreground leading-none">
            {t('name')} <span className="text-primary wave">👋</span>
          </h1>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full border-t py-4 mt-2  grid grid-cols-1 md:grid-cols-2 gap-y-6 text-sm md:text-base text-muted-foreground font-medium"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-2 items-center md:items-start pl-2">
            <div className="flex items-center gap-3">
              {!isUpworkMode && (
                <a href="https://www.linkedin.com/in/azizismailov" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors text-foreground">
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
              )}
              <a href={isUpworkMode ? undefined : "https://www.linkedin.com/in/azizismailov"} target={isUpworkMode ? undefined : "_blank"} rel={isUpworkMode ? undefined : "noopener noreferrer"} className={`px-3 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${!isUpworkMode && "hover:bg-blue-500/10 transition-colors"}`}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400"></span>
                </span>
                {t('status')}
              </a>
            </div>
            <p className="tracking-tight text-muted-foreground/80">{t('role')}</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 items-center md:items-end pr-2">
            <div>
              {isUpworkMode ? (
                <span className="text-foreground tracking-tight">Available on Upwork</span>
              ) : (
                <a href="mailto:azizismailov872872@gmail.com" className="hover:text-foreground transition-colors tracking-tight">
                  azizismailov872872@gmail.com
                </a>
              )}
              <p className="tracking-tight text-muted-foreground/80">{t('location')} 🇰🇷</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Services Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-auto w-full border-y border-border py-1 hidden md:flex justify-center text-sm md:text-base text-muted-foreground bg-background/50 backdrop-blur-sm"
      >
        <div className="w-full max-w-6xl px-6 flex justify-between">
          <span>{t('services.fullstack')}</span>
          <span>{t('services.saas')}</span>
          <span>{t('services.system')}</span>
        </div>
      </motion.div>
    </section>
  );
};
