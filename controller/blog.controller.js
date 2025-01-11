const Blog = require('../model/blog.model');
const catchAsync = require('../utils/catchAsync');
const createBlogShema = require('../validation/blog.validation')

const getPosts = catchAsync(async(req, res)=>{
    const blogs = await Blog.find({});
    res.json(blogs);
}) 

const createPost =  catchAsync(async (req, res)=> {
    const blog = await Blog.create(req.body);
    res.json({
        success: true,
        message: "Blog created succesfully",
        data: blog
    })
}) 

module.exports = {
    createPost,
    getPosts
}

