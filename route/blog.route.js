const express = require('express')
const {blogController} = require('../controller')
const {blogValidation} = require('../validation')
const validate = require('../middlewares/validate.js')

const router = express.Router()


router.get('/blog',blogController.getPosts)
router.post('/blog', validate(blogValidation.createBlogSchema), blogController.createPost)

module.exports = router