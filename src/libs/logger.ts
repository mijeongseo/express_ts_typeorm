import { createLogger, format, transports } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const options = {
    info: {
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: './logs',
        filename: `%DATE%.log`,
        handleExceptions: true,
        maxFiles: 5,
        zippedArchive: true,
    },
    error: {
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: './logs/error',
        filename: `%DATE%.error.log`,
        maxFiles: 5,
        zippedArchive: true,
        handleExceptions: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    },
};

const logger = createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [new winstonDaily(options.info), new winstonDaily(options.error)],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console(options.console));
}

const stream = {
    write: function (message: string) {
        logger.info(message);
    },
};

export { logger, stream };
