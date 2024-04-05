import winston, { type Logger, LoggerOptions } from 'winston'

function createLogger(opts?: LoggerOptions): Logger {
    const transportDefault = new winston.transports.Console({
        format:
            process.env.NODE_ENV !== 'production'
                ? winston.format.combine(winston.format.colorize(), winston.format.simple())
                : winston.format.json(),
    })

    const transports = !opts?.transports
        ? transportDefault
        : Array.isArray(opts.transports)
          ? [transportDefault, ...opts.transports]
          : [transportDefault, opts.transports]

    return winston.createLogger({ ...opts, transports })
}

const logger = createLogger({ level: 'verbose' })

export { logger }
