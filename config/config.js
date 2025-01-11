require('dotenv').config()
const logger = require('./logger')
const envVarSchema = require('../validation/env.validation')

const {value: envVars, error}= envVarSchema.validate(process.env)

if(error) logger.error(error);

module.exports = {
    port : envVars.PORT,
    db_url: envVars.DB_URL,
    env: envVars.NODE_ENV
}