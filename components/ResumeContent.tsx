"use client";

import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BackgroundLayer } from '@/components/BackgroundLayer';
import { Header } from '@/components/Header';
import { useTranslations } from 'next-intl';

export function ResumeContent() {
    const t = useTranslations('Resume');

    return (
        <div className="relative min-h-screen bg-secondary/30 text-foreground selection:bg-foreground selection:text-background">
            <BackgroundLayer />
            <Header />

            <main className="pt-32 pb-24 px-4 sm:px-6">

                {/* Actions Bar */}
                <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between print:hidden">
                    <Link href="/about" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        {t('back')}
                    </Link>

                    <a
                        href="/assets/Resume.pdf"
                        download="Aziz_Ismailov_Resume.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        <Download className="w-4 h-4" />
                        {t('download')}
                    </a>
                </div>

                {/* Document Container */}
                <div className="max-w-3xl mx-auto bg-background rounded-sm shadow-sm border border-border/40 p-8 md:p-16 min-h-[1000px]">

                    {/* Header */}
                    <div className="border-b border-border/40 pb-8 mb-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{t('title')}</h1>
                        <p className="text-muted-foreground text-sm flex flex-wrap gap-x-4 gap-y-1">
                            <span>{t('location')}</span>
                            <span>•</span>
                            <span>{t('role')}</span>
                        </p>
                    </div>

                    <div className="space-y-12">

                        {/* Summary */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">{t('sections.summary')}</h2>
                            <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                                <p>
                                    {t('summaryText.p1')}
                                </p>
                                <p>
                                    {t('summaryText.p2')}
                                </p>
                            </div>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">{t('sections.experience')}</h2>
                            <div className="space-y-8">
                                {/* Job 1 */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-sm">{t('items.contractor.title')}</h3>
                                        <span className="text-xs text-muted-foreground tabular-nums">01/2024 — Present</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-3">{t('items.contractor.role')} | {t('items.contractor.location')}</div>
                                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-foreground/80 leading-relaxed">
                                        <li>{t('items.contractor.points.0')}</li>
                                        <li>{t('items.contractor.points.1')}</li>
                                        <li>
                                            <strong>Key Achievement:</strong> {t.rich('items.contractor.points.2', {
                                                span: (chunks) => <span className="font-medium text-foreground">{chunks}</span>
                                            })}
                                        </li>
                                    </ul>
                                </div>

                                {/* Job 2 */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-sm">{t('items.freelance.title')}</h3>
                                        <span className="text-xs text-muted-foreground tabular-nums">01/2019 — 01/2023</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-3">{t('items.freelance.role')} | {t('items.freelance.location')}</div>
                                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-foreground/80 leading-relaxed">
                                        <li>{t('items.freelance.points.0')}</li>
                                        <li>{t('items.freelance.points.1')}</li>
                                        <li>{t('items.freelance.points.2')}</li>
                                    </ul>
                                </div>

                                {/* Job 3 */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-sm">{t('items.intern.title')}</h3>
                                        <span className="text-xs text-muted-foreground tabular-nums">Internship</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-3">{t('items.intern.role')} | {t('items.intern.location')}</div>
                                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-foreground/80 leading-relaxed">
                                        <li>{t('items.intern.points.0')}</li>
                                        <li>{t('items.intern.points.1')}</li>
                                        <li>{t('items.intern.points.2')}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">{t('sections.projects')}</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-sm mb-1">{t('projects.eventlabs.title')}</h3>
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                        {t('projects.eventlabs.desc')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm mb-1">{t('projects.manga.title')}</h3>
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                        {t('projects.manga.desc')}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">{t('sections.skills')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                <div>
                                    <h4 className="font-medium mb-1 text-xs text-muted-foreground uppercase">{t('skillCategories.core')}</h4>
                                    <p className="text-foreground/80">JavaScript (ES6+), TypeScript, React, Next.js (App Router), Node.js, Bun</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1 text-xs text-muted-foreground uppercase">{t('skillCategories.backend')}</h4>
                                    <p className="text-foreground/80">ElysiaJS, RESTful APIs, Server Actions, Microservices, Webhooks, System Design</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1 text-xs text-muted-foreground uppercase">{t('skillCategories.database')}</h4>
                                    <p className="text-foreground/80">PostgreSQL, MySQL, Drizzle ORM, Prisma, ERD Modeling</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1 text-xs text-muted-foreground uppercase">{t('skillCategories.devops')}</h4>
                                    <p className="text-foreground/80">Docker, AWS (Basic), Linux/VPS, Vercel, CI/CD, Git, basic Figma</p>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">{t('sections.education')}</h2>
                            <div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-sm">{t('education.school')}</h3>
                                    <span className="text-xs text-muted-foreground tabular-nums">{t('education.location')}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mb-3">{t('education.degree')}</div>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {t('education.desc')}
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
