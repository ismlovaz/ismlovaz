import { setRequestLocale } from 'next-intl/server';
import { AboutContent } from '@/components/AboutContent';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'About',
};

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <Suspense fallback={null}>
            <AboutContent />
        </Suspense>
    );
}
