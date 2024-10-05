/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/blog',
      destination:
        'https://ledesmablt.notion.site/b79ce94d7b22490c9aa3deac39837096',
      permanent: false,
    },
  ],
}

module.exports = nextConfig
