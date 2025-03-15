require('dotenv').config()
const logger = require('./logger')
const {envValidation} = require('../validation')

const {value: envVars, error}= envValidation.validate(process.env)

if(error) logger.error(error);

module.exports = {
    port : envVars.PORT,
    db_url: envVars.DB_URL,
    env: envVars.NODE_ENV,
    jwt: {
        secret:envVars.JWT_SECRET,
        accessTokenExpirationMins: envVars.JWT_ACCESS_EXPIRATION_MINS,
        refreshTokenExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
    }
}