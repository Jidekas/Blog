const j = require('joi')

const envVarSchema = j.object({
    DB_URL: j.string().required(),
    PORT: j.number().positive().default(3500)
})
.unknown();

module.exports = envVarSchema