const {User} = require('../model');
const ApiError = require('../utils/ApiError')
const {StatusCodes} = require('http-status-codes')


const createUser =  async (userBody)=> {
    //check if userExist
    if(await User.isEmailtaken(userBody.email)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "email is already taken")
    }
    const user = await User.create(userBody);
    return user
}

module.exports = {
    createUser
}
