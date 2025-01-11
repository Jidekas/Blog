const j = require('joi')

const createBlogSchema = {
    body: j.object().keys({
        title: j.string().required(),
        description: j.string().required(),
    })
}


module.exports = {
    createBlogSchema
}




// const handleError = (reply: FastifyReply, error: unknown) => {
//     if (error instanceof Error) {
//       reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message })
//     } else {
//       reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error occurred' })
//     }
//   }
