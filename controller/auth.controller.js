const catchAsync = require('./../utils/catchAsync')
const {StatusCodes} = require('http-status-codes')
const {userService} = require('../services/')

const register = catchAsync( async(req, res) =>{
    //create user
    const user = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).send({data:user})
    //generate token
})

module.exports = {
    register
}