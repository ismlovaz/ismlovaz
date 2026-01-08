"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="py-8 px-4 md:px-6" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-foreground/5 dark:bg-foreground/10 rounded-[2.5rem] p-8 md:p-16"
      >
        <div className="flex flex-col items-start gap-8 mb-24 md:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight max-w-3xl text-foreground">
            {t('title')}
          </h2>
          <a
            href="mailto:azizismailov872872@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-full font-medium text-lg hover:bg-background/80 transition-colors shadow-sm"
          >
            {t('cta')}
          </a>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex-1 flex justify-center md:justify-start gap-4">
            <a href="https://github.com/ismlovaz" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">GitHub</a>
            <a href="https://www.linkedin.com/in/azizismailov/" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">LinkedIn</a>
            <a href="https://t.me/tm872872" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">Telegram</a>
          </div>

          <div className="text-center flex-1">
            © {new Date().getFullYear()} Aziz Ismailov. {t('rights')}
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <a href="mailto:azizismailov872872@gmail.com" className="hover:text-foreground transition-colors">
              azizismailov872872@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
