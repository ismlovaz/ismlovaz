"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../i18n/navigation';
import { useTransition } from 'react';

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'ko' : 'en';

        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors disabled:opacity-50"
            aria-label="Toggle language"
        >
            <span
                className={`text-lg leading-none transition-all duration-300 ${locale === 'en' ? 'opacity-100 scale-110 drop-shadow-sm' : 'opacity-50 scale-90 delay-100 hover:opacity-100'}`}
                role="img"
                aria-label="English"
            >
                🇺🇸
            </span>

            <span className="w-px h-4 bg-foreground/20" />

            <span
                className={`text-lg leading-none transition-all duration-300 ${locale === 'ko' ? 'opacity-100 scale-110 drop-shadow-sm' : 'opacity-50 scale-90 delay-100 hover:opacity-100'}`}
                role="img"
                aria-label="Korean"
            >
                🇰🇷
            </span>
        </button>
    );
};
