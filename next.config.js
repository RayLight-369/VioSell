/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', "res.cloudinary.com", "lmxqvapkmczkpcfheiun.supabase.co"]
  },
  profiler: true
};

module.exports = nextConfig;
