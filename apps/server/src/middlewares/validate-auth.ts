import { Request, Response, NextFunction } from 'express'
import { verifyRequestOrigin, lucia, User, Session } from '@pomofy/lucia-auth'

export const csrfProtection = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        return next()
    }

    const originHeader = req.headers.origin ?? null
    const hostHeader = req.headers.host ?? null

    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
        return res.status(403).json({ message: 'FORBIDDEN' }).end()
    }
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

    return next()
}

declare global {
    namespace Express {
        interface Locals {
            user: User | null
            session: Session | null
        }
    }
}
