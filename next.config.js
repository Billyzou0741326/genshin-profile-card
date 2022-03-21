/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'uploadstatic-sea.hoyoverse.com',
      'upload-os-bbs.mihoyo.com',
    ],
  },
}

module.exports = nextConfig
