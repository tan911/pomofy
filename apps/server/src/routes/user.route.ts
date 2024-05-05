import { Router } from 'express'

import { services } from '../services'
import { CreateTaskSchema } from '../services/user/user.schema'

const route: Router = Router()

route.get(
    '/',
    services.create({
        input: undefined,
        output: async ({ ctx }) => {
            return await ctx.userService.getTask(ctx.user?.id ?? '')
        },
    })
)

route.post(
    '/',
    services.create({
        input: CreateTaskSchema,
        output: async ({ ctx, input }) => {
            return await ctx.userService.createTask({ id: ctx.user?.id ?? '', input })
        },
    })
)

route.patch(
    '/',
    services.create({
        input: undefined,
        output: async ({ ctx, req }) => {
            return ctx.userService.updateTask(req.body.id)
        },
    })
)

export default route
