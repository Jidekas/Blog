const j = require('joi')

const envVarSchema = j.object({
    DB_URL: j.string().required(),
    PORT: j.number().positive().default(3500)
})
.unknown(); // allows other items not in the validation

module.exports = envVarSchema