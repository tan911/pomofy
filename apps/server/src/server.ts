import app from './app'
import { logger } from './lib/logger'
import env from './env'

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`)
})

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`)
})

const server = app.listen(Number(env.SERVER_PORT), () => {
    logger.info(`Server running at \thttp://localhost:${Number(env.SERVER_PORT)}`)
})

server.on('error', (err) => logger.error('AppServer failed to start from server.ts', err))
