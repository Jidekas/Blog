const express = require('express')
const {createPost,getPosts} = require('../controller/blog.controller.js')
const {createBlogSchema} = require('../validation/blog.validation.js')
const validate = require('../middlewares/validate.js')

const router = express.Router()


router.get('/blog',getPosts)
router.post('/blog', validate(createBlogSchema), createPost)

module.exports = router