const express = require('express')
const {authController} = require('../controller')
const validate = require('../middlewares/validate.js')
const {userValidation, authValidation} = require('../validation')

const router = express.Router()



router.post('/register', validate(userValidation.createUserSchema) ,authController.register)
router.post('/login', validate(authValidation.loginSchema), authController.login)
router.post('/refresh-token', validate(authValidation.refreshTokenSchema), authController.refreshTokens)

module.exports = router