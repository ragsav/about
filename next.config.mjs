/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized: true,
  },
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
