import {createLogger,format,transports} from "winston";

export const logger = createLogger({
    level:"info",

    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logger/debug.log", level: "debug" }),
        new transports.File({ filename: "logger/error.log", level: "error" }),
        new transports.File({ filename: "logger/combined.log" }),
    ]
})