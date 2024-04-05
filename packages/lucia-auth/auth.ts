import { Lucia, generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from '@pomofy/prisma'
import type { Session, User } from 'lucia'

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export { Argon2id, generateId, Session, User }

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            emailVerified: attributes.email_verified,
        }
    },
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: {
            email: string
            email_verified: boolean
        }
    }
}
