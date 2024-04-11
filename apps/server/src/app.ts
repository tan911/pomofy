import 'express-async-errors'
import 'module-alias/register'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { csrfProtection, validateAuthSession } from './middlewares/validate-auth'
import { errorHandler } from '@middlewares/app-error'
import { logger } from '@lib/logger'
import { taskRouter } from '@routes/index'
import env from './env'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    morgan(env.SERVER_LOG, {
        stream: {
            write: (message: string) => {
                logger.http(message.trim())
            },
        },
    })
)

app.use('/api/v1', csrfProtection, validateAuthSession)

app.use('/api/v1/task', taskRouter)

app.use('*', (req, res, next) => {
    next({ name: 'PAGE NOT FOUND', statusCode: 404, url: req.originalUrl })
})
app.use(errorHandler)

export default app
