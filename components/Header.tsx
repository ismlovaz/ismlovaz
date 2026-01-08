"use client";
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

const navLinks = [
  { label: 'Home', href: '/#home', key: 'home' },
  { label: 'Approach', href: '/#approach', key: 'approach' },
  { label: 'About', href: '/about', key: 'about' },
  { label: 'Capabilities', href: '/#nav_capabilities', key: 'capabilities' },
];

export const Header = () => {
  const { scrollY } = useScroll();
  const { resolvedTheme, setTheme } = useTheme();
  // Use mounted state to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Header');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  // Map scroll to opacity (0 to 1)
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  // Map scroll to other properties if needed, or simplify
  const padding = useTransform(scrollY, [0, 50], ['16px 24px', '12px 24px']);
  const width = useTransform(scrollY, [0, 50], ['90%', 'auto']); // Wider on mobile start

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 z-50 flex items-center justify-center max-w-5xl"
        style={{
          x: '-50%',
          width,
          padding,
        }}
      >
        {/* Background Layer - handles Theme Colors via CSS + Scroll Opacity via Framer */}
        <motion.div
          className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm transition-colors duration-[1250ms]"
          style={{ opacity: headerOpacity }}
        />

        {/* Content Layer */}
        <nav className="relative z-10 flex items-center justify-between w-full md:w-auto md:justify-center gap-4 md:gap-8">

          {/* Mobile Logo / Home Link (Optional, or just keep spacing) */}
          <div className="md:hidden font-bold text-lg tracking-tight">
            AI
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#home"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {t('home')}
            </Link>
            <Link
              href="/#approach"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {t('approach')}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {t('about')}
            </Link>
            {/* Capabilities was in original file 1112 */}
            <Link
              href="/#capabilities"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {t('capabilities')}
            </Link>

            {/* Resume Link - Styled distinctively */}
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 transition-all duration-300 text-xs font-semibold tracking-wide"
            >
              {t('resume')} <span className="text-xs">📄</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-foreground/80 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <span className="text-xl leading-none">✕</span>
              ) : (
                <span className="text-xl leading-none">☰</span>
              )}
            </button>
          </div>

          {/* Desktop Actions (Theme + Lang) */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col items-center gap-8"
          >
            <Link
              href="/#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/80 hover:text-foreground"
            >
              {t('home')}
            </Link>
            <Link
              href="/#approach"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/80 hover:text-foreground"
            >
              {t('approach')}
            </Link>
            <Link
              href="/#capabilities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/80 hover:text-foreground"
            >
              {t('capabilities')}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/80 hover:text-foreground"
            >
              {t('about')}
            </Link>
            <Link
              href="/resume"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-bold text-lg"
            >
              {t('resume')} 📄
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
