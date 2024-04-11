import { z } from 'zod'

const envSchema = z.object({
    SERVER_PORT: z.string().default('5000'),
    SERVER_LOG: z.string().default(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'),
})

const env = envSchema.parse(process.env)
export default env
