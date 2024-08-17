/** @type {import('next').NextConfig} */
import * as NextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig = {
    output: 'standalone',
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    transpilePackages: ["next-mdx-remote"],
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
          }
        ],
    },
};

const withMDX = NextMdx.default({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);