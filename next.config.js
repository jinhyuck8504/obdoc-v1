/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 빌드 시 ESLint 에러 무시 (배포용)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 에러는 체크
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig