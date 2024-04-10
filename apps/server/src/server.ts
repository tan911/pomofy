import app from './app'
import { logger } from './lib/logger'

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`)
})

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`)
})

const server = app.listen(process.env.SERVER_PORT ?? 5000, () => {
    logger.info(`Server running at \thttp://localhost:${process.env.SERVER_PORT ?? 5000}`)
})

server.on('error', (err) => logger.error('AppServer failed to start from server.ts', err))
