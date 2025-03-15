const j = require('joi');

const loginSchema = {
    body: j.object().keys({
        email: j.string().email().required(),
        password: j.string().required(),
    })
}

const refreshTokenSchema = {
    body: j.object().keys({
      refreshToken: j.string().required(),
    }),
  };

module.exports = {
    loginSchema,
    refreshTokenSchema
}