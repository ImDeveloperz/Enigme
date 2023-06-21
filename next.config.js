/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    },
    skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig
