import { Request, Response, NextFunction } from 'express'
import { verifyRequestOrigin, lucia, User, Session } from '@pomofy/lucia-auth'
import env from '../env'

export const csrfProtection = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        return next()
    }

    const originHeader = req.headers.origin ?? null
    const hostHeader = req.headers.host ?? null

    if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader, env.NEXT_PUBLIC_URL])
    ) {
        return res.status(403).json({ message: 'FORBIDDEN' }).end()
    }

    return next()
}

export const validateAuthSession = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization
    const sessionId = await lucia.readBearerToken(authorizationHeader ?? '')

    if (!sessionId) {
        return res.status(401).json({
            message: 'Unauthorize',
        })
    }

    const { session, user } = await lucia.validateSession(sessionId)

    if (session && session.fresh) {
        res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    }

    if (!session) {
        res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    }

    res.locals.user = user
    res.locals.session = session

    if (!res.locals.user || !res.locals.session) {
        return res.status(401).json({
            message: 'Unauthorize',
        })
    }

    return next()
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Locals {
            user: User | null
            session: Session | null
        }
    }
}
