const {StatusCodes} = require('http-status-codes')
const catchAsync = require('../utils/catchAsync');
const {blogService} = require('../services')

const getPosts = catchAsync(async(req, res)=>{
    const blogs = await blogService.getPosts()
    res.status(StatusCodes.OK).json(blogs);
}) 

const createPost =  catchAsync(async (req, res)=> {
    const blog = await blogService.createPost(req.body)
    res
    .status(StatusCodes.CREATED)
    .json({
        success: true,
        message: "Blog created succesfully",
        data: blog
    })
}) 

module.exports = {
    createPost,
    getPosts
}

