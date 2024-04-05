/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
        config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
        return config
    },
    experimental: {
        serverComponentsExternalPackages: ['oslo'],
    },
    transpilePackages: ['@pomofy/ui', '@pomofy/lucia-auth', '@pomofy/prisma', 'lucide-react'],
}
