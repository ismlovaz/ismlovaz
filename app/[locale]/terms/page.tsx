"use client";

import { useTranslations } from 'next-intl';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BackgroundLayer } from '@/components/BackgroundLayer';
import { Header } from '@/components/Header';

export default function TermsPage() {
    const t = useTranslations('Terms');
    const sections = ['0', '1', '2', '3', '4', '5', '6', '7'];

    const downloadOptions = [
        { label: t('versions.en'), locale: 'en' },
        { label: t('versions.ko'), locale: 'ko' },
        { label: t('versions.ru'), locale: 'ru' },
    ];

    const handleDownload = (locale: string) => {
        const filename = `terms-${locale}.pdf`;
        window.open(`/assets/${filename}`, '_blank');
    };

    return (
        <div className="relative min-h-screen bg-secondary/30 text-foreground selection:bg-foreground selection:text-background">
            <BackgroundLayer />
            <Header />

            <main className="pt-32 pb-24 px-4 sm:px-6">

                {/* Actions Bar */}
                <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between print:hidden">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" className="gap-2 rounded-full h-9 px-4 text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity">
                                <Download className="w-4 h-4" />
                                {t('download')}
                                <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {downloadOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.locale}
                                    onClick={() => handleDownload(option.locale)}
                                    className="cursor-pointer"
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Document Container (Paper Style) */}
                <div className="max-w-3xl mx-auto bg-background rounded-sm shadow-sm border border-border/40 p-8 md:p-16 min-h-[1000px]">

                    {/* Header */}
                    <div className="border-b border-border/40 pb-8 mb-12">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{t('title')}</h1>
                        <p className="text-muted-foreground text-sm flex flex-wrap gap-x-4 gap-y-1">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {sections.map((key, index) => (
                            <Section
                                key={key}
                                index={index}
                                title={t(`sections.${key}.title`)}
                                content={t(`sections.${key}.content`)}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function Section({ index, title, content }: { index: number, title: string, content: string }) {
    const parseContent = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const contentElements = content.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
            {parseContent(paragraph)}
        </p>
    ));

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group"
        >
            <div className="flex gap-4 md:gap-6">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-muted-foreground text-xs font-bold mt-0.5 border border-border">
                    {index + 1}
                </span>
                <div className="space-y-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {title}
                    </h2>
                    <div className="space-y-3 leading-relaxed">
                        {contentElements}
                    </div>
                </div>
            </div>
            {/* Optional Divider - kept subtle matching resume feel */}
            {index < 7 && <div className="h-px bg-border/40 mt-8 ml-10 md:ml-12 opacity-50" />}
        </motion.section>
    );
}
