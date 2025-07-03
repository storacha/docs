/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma']
  },
  redirects() {
    return [
      {
        source: '/w3up-client',
        destination: '/js-client',
        permanent: true,
      },
      {
        source: '/go-w3up',
        destination: '/go-client',
        permanent: true,
      },
      {
        source: '/w3cli',
        destination: '/cli',
        permanent: true,
      },
    ]
  },
}

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.jsx'
})

module.exports = withNextra(nextConfig)
