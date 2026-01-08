import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Aziz Ismailov',
        default: 'Aziz Ismailov - Full-Stack Software Engineer'
    },
    description: "Aziz Ismailov - Full-Stack Software Engineer & SaaS Architect. Building scalable web applications and cloud infrastructure.",
    metadataBase: new URL('https://azizismailov.com'), // Replace with actual domain
    openGraph: {
        title: 'Aziz Ismailov',
        description: 'Full-Stack Software Engineer & SaaS Architect',
        url: 'https://azizismailov.com',
        siteName: 'Aziz Ismailov',
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        languages: {
            'en': '/en',
            'ko': '/ko',
        },
    },
};

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ko' }];
}

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'ko'].includes(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        {children}
                        <Toaster />
                        <Sonner />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
