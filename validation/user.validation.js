const j = require('joi');
const { password } = require('./custom.validation');


const createUserSchema = {
    body: j.object().keys({
        name: j.string().required(),
        email: j.string().email().required(),
        password: j.custom(password).required(),
    })
}

module.exports = {
    createUserSchema,
}