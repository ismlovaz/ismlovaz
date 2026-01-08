import { setRequestLocale } from 'next-intl/server';
import { ResumeContent } from '@/components/ResumeContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume',
};

export default async function ResumePage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ResumeContent />;
}
