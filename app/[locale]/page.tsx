import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Approach } from '@/components/Approach';
import { Capabilities } from '@/components/Capabilities';
import { Work } from '@/components/Work';
import { Footer } from '@/components/Footer';
import { BackgroundLayer } from '@/components/BackgroundLayer';
import { Suspense } from 'react';

import { setRequestLocale } from 'next-intl/server';

export default async function Home({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="relative">
            <BackgroundLayer />
            <Header />
            <main>
                <Suspense fallback={null}>
                    <Hero />
                </Suspense>
                <Approach />
                <Work />
                <Capabilities />
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            </main>
        </div>
    );
}
