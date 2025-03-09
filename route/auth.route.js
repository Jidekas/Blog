const express = require('express')
const {authController} = require('../controller')
const validate = require('../middlewares/validate.js')
const {userValidation} = require('../validation')

const router = express.Router()



router.post('/auth/register', validate(userValidation.createUserSchema) ,authController.register)

module.exports = router