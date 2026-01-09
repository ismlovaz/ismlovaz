"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BackgroundLayer } from '@/components/BackgroundLayer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import meImage from '@/assets/me.jpg'
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function AboutContent() {
    const t = useTranslations('About');
    const heroT = useTranslations('Hero');
    const resumeT = useTranslations('Resume');

    return (
        <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
            <BackgroundLayer />
            <Header />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-2xl mx-auto space-y-16">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-start justify-between">
                            <Image
                                src={meImage}
                                alt="Aziz"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded-full bg-secondary/80 border border-border/50 overflow-hidden relative"
                            />
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl font-semibold tracking-tight">
                                {t('greeting')}
                            </h1>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                {heroT('status')}
                            </div>
                        </div>
                    </div>
                    <section className="space-y-6">
                        <h2 className="text-lg font-medium text-foreground">{t('title')}</h2>
                        <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-[15px]">
                            <p>
                                {t.rich('intro', {
                                    role: t('role'),
                                    stack: 'React, Next.js, TypeScript',
                                    highlight: (chunks) => <strong className="font-medium text-foreground">{chunks}</strong>
                                })}
                            </p>
                            <p>
                                {t('philosophy')}
                            </p>
                            <p>
                                {t.rich('location', {
                                    location: resumeT('location'),
                                    highlight: (chunks) => <strong className="font-medium text-foreground">{chunks}</strong>
                                })}
                            </p>

                            <div className="pt-2 flex items-center gap-6">
                                <a
                                    href="/resume"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-border/50 pb-0.5 hover:border-foreground transition-colors group"
                                >
                                    {t('viewResume')}
                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <a
                                    href="/terms"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-border/50 pb-0.5 hover:border-foreground transition-colors group"
                                >
                                    {t('viewTerms')}
                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className="space-y-8">
                        <h2 className="text-lg font-medium text-foreground">{t('sections.experience')}</h2>
                        <ExperienceList />

                    </section>
                    <section className="space-y-6 pt-8 border-t border-border/40">
                        <h2 className="text-lg font-medium text-foreground">{t('sections.connect')}</h2>
                        <div className="flex gap-4">
                            <a href="mailto:azizismailov872872@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">Email</a>
                            <a href="https://github.com/ismlovaz" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">GitHub</a>
                            <a href="https://www.linkedin.com/in/azizismailov/" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">LinkedIn</a>
                            <a href="https://t.me/tm872872" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50">Telegram</a>
                        </div>
                    </section>
                </div>
            </main>

            <React.Suspense fallback={null}>
                <Footer />
            </React.Suspense>
        </div>
    );
}

const ExperienceList = () => {
    const t = useTranslations('Resume.items');

    return (
        <div className="space-y-10">
            {/* Experience Item 1 */}
            <div className="grid grid-cols-[1fr,3fr] gap-4 md:gap-8 items-start group">
                <span className="text-sm text-muted-foreground/60 tabular-nums pt-0.5">Jan 2024 — Present</span>
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground group-hover:underline decoration-border/50 underline-offset-4 transition-all">
                                {t('contractor.title')}
                            </h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs text-muted-foreground/60 mt-1">{t('contractor.location')}</div>
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>{t('contractor.points.0')}</p>
                        <p>{t('contractor.points.1')}</p>
                        <p className="text-foreground/80">
                            <strong>Key Achievement:</strong> {t('contractor.points.2')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Experience Item 2 */}
            <div className="grid grid-cols-[1fr,3fr] gap-4 md:gap-8 items-start group">
                <span className="text-sm text-muted-foreground/60 tabular-nums pt-0.5">2019 — 2023</span>
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground group-hover:underline decoration-border/50 underline-offset-4 transition-all">
                                {t('freelance.title')}
                            </h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs text-muted-foreground/60 mt-1">{t('freelance.location')}</div>
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>{t('freelance.points.0')}</p>
                        <p>{t('freelance.points.1')}</p>
                        <p>{t('freelance.points.2')}</p>
                    </div>
                </div>
            </div>

            {/* Experience Item 3 */}
            <div className="grid grid-cols-[1fr,3fr] gap-4 md:gap-8 items-start group">
                <span className="text-sm text-muted-foreground/60 tabular-nums pt-0.5">Summer 202X</span>
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground group-hover:underline decoration-border/50 underline-offset-4 transition-all">
                                {t('intern.title')}
                            </h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs text-muted-foreground/60 mt-1">{t('intern.location')}</div>
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>{t('intern.points.0')}</p>
                        <p>{t('intern.points.1')}</p>
                        <p>{t('intern.points.2')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
