/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
    webpack: (config, { isServer }) => {
        config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')

        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
        }
        return config
    },
    experimental: {
        serverComponentsExternalPackages: ['oslo'],
    },
    transpilePackages: ['@pomofy/ui', '@pomofy/lucia-auth', '@pomofy/prisma', 'lucide-react'],
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
}
