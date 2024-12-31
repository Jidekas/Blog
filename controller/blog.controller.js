const Blog = require('../model/blog.model')
const createBlogShema = require('../validation/blog.validation')

const getPosts = async(req, res)=>{
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        console.error(error)
        res.send({error: true, message: error.message}); 
    }
}

const createPost = async (req, res)=> {
    try {
        const blog = await Blog.create(req.body);
        res.json({
            success: true,
            message: "Blog created succesfully",
            data: blog
        })
    } catch (error) {
        console.error(error)
        res.send({error: true, message: error.message}); 
    }
}

module.exports = {
    createPost,
    getPosts
}

