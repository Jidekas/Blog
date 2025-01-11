const {format, createLogger, transports } = require('winston');
const config = require('./config')
const {printf, combine, timestamp, colorize, uncolorize} = format


const customFormat = printf(({level, message, timestamp, stack})=>{
    return `${timestamp}: ${level}: ${stack || message}`
})

const logger = createLogger({
    level: config.env = "development" ? "debug" : "info",
    format: combine(timestamp(), customFormat,
    config.env === "development"? colorize() : uncolorize()
),
    transports: [new transports.Console()]
})

module.exports = logger