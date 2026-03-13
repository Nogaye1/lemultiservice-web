/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [{ protocol: 'https', hostname: '**' }],
        unoptimized: true,
    },
    // Force Babel fallback when SWC native binary is unavailable
    experimental: {
        forceSwcTransforms: false,
    },
    swcMinify: false,
    trailingSlash: true,
}
export default nextConfig
