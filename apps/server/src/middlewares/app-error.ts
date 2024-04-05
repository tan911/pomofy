import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { logger } from '@lib/logger'

export function errorHandler(
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(JSON.stringify(error))
    logger.debug(JSON.stringify(error))

    res.status(500).json({ message: error })
}
