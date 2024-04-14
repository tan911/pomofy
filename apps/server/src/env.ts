import { z } from 'zod'

const envSchema = z.object({
    SERVER_PORT: z.string().default('5000'),
    POMOFY_LOG: z.string().default(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'),
    NEXT_PUBLIC_SERVER_URL: z.string().default('http://localhost:5000'),
    NEXT_PUBLIC_URL: z.string().default('http://localhost:3000'),
})

const env = envSchema.parse(process.env)

export default env
