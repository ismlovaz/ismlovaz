import { setRequestLocale } from 'next-intl/server';
import { TermsContent } from '@/components/TermsContent';
import { routing } from '@/i18n/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Cooperation',
};

export default async function TermsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <TermsContent />;
}
