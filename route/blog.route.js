const express = require('express')
const {blogController} = require('../controller')
const {blogValidation} = require('../validation')
const {authController} = require('../controller')
const validate = require('../middlewares/validate.js')

const router = express.Router()


router.get('/blog',blogController.getPosts)
router.post('/blog', validate(blogValidation.createBlogSchema), blogController.createPost)
router.post('/register', authController.register)

module.exports = router