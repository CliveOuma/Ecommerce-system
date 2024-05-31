/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/e-buy-2073d.appspot.com/o/**',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
          port: '',
          pathname: '/images/I/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  