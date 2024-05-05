import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { z } from 'zod'
import { prisma } from '@pomofy/prisma'
import { logger } from '@lib/logger'
import { UserService } from './user/user.services'

type CreateArgs<TInput, TOutput, TContext> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: { parse: (input: any) => TInput } | undefined
    output: (args: { ctx: TContext; input: TInput; req: Request }) => Promise<TOutput>
}

class ServiceFactory<TContext> {
    constructor(private context: (res: Response) => TContext | Promise<TContext>) {}

    create<TInput, TOutput>(args: CreateArgs<TInput, TOutput, TContext>): RequestHandler {
        const { input, output } = args

        let validatedInput: TInput | undefined

        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                validatedInput = input?.parse({ ...req.params, ...req.query, ...req.body })
            } catch (error) {
                logger.error(error)
                if (error instanceof z.ZodError) {
                    return res.status(400).json(error.format())
                }
                next()
            }

            const ctx = (await this.context(res)) as TContext

            if (!ctx) {
                res.status(401).json({ message: 'Unauthorize' })
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            output({ ctx, input: validatedInput as any, req })
                .then((opt) => res.status(200).json(opt))
                .catch((error) => new Error(error))
        }
    }
}

const userService = new UserService(prisma)

async function userContext(res: Response) {
    const user = res.locals.user
        ? await prisma.user.findUnique({
              where: {
                  id: res.locals.user?.id,
              },
          })
        : null

    return { user, userService }
}

export const services = new ServiceFactory(userContext)
