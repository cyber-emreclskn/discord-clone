/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",              // UploadThing v7 CDN
      "img.clerk.com"         // Clerk user avatars
    ]
  },
  swcMinify: false
};

module.exports = nextConfig;
