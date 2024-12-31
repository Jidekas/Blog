const j = require('joi')

// const createBlogSchema = j.object({
//     title: j.string().required(),
//     description: j.string().required(),
// })

const createBlogSchema = {
    body: j.object().keys({
        title: j.string().required(),
        description: j.string().required(),
    })
}


module.exports = {
    createBlogSchema
}
