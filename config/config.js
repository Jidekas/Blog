require('dotenv').config()
const envVarSchema = require('../validation/env.validation')

const {value: envVars, error}= envVarSchema.validate(process.env)

if(error) console.error(error);

module.exports = {
    port : envVars.PORT,
    db_url: envVars.DB_URL
}