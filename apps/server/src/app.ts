import 'express-async-errors'
import 'module-alias/register'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { lucia, verifyRequestOrigin } from '@pomofy/lucia-auth'
import { errorHandler } from '@middlewares/app-error'
import { logger } from '@lib/logger'
import { taskRouter } from '@routes/index'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    morgan('dev', {
        stream: {
            write: (message: string) => {
                logger.http(message.trim())
            },
        },
    })
)

app.use('/api/v1', async (req, res, next) => {
    const originHeader = req.headers.origin ?? null
    const hostHeader = req.headers.host ?? null

    // if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    //     return res.status(403).end()
    // }

    return res.json({ message: 'test' })
})

app.use('/api/v1/task', taskRouter)

app.use('*', (req, res, next) => {
    next({ name: 'PAGE NOT FOUND', statusCode: 404, url: req.originalUrl })
})
app.use(errorHandler)

export default app
