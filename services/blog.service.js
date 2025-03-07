const {Blog} = require('../model');


const getPosts = async()=>{
    const blogs = await Blog.find({});
    return blogs;
}

const createPost =  async (data)=> {
    const blog = await Blog.create(data);
    return blog
}

module.exports = {
    createPost,
    getPosts
}

