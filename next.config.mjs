import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin(
    './i18n/request.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // legacy support removed
};
 
export default withNextIntl(nextConfig);
