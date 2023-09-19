/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      swcPlugins: [
        ["next-superjson-plugin", {}]
      ]
    },
    images: {
      domains: [
        'lh3.googleusercontent.com',
        'res.cloudinary.com',
        'firebasestorage.googleapis.com'
      ]
    }
  }
  
  module.exports = nextConfig