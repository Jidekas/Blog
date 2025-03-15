const catchAsync = require('./../utils/catchAsync')
const {StatusCodes} = require('http-status-codes')
const {userService, authService, tokenService} = require('../services/');
const ApiError = require('../utils/ApiError');

const register = catchAsync( async(req, res) =>{
    //create user
    const user = await userService.createUser(req.body);
    //generate token
    const tokens = generateAuthTokens(user.id)
    res.status(StatusCodes.CREATED).send({data:{user, tokens}})
})


const login = catchAsync( async(req, res) =>{
    const { email, password } = req.body;
    const user = await authService.login(email, password)
    //generate token
    const tokens = await tokenService.generateAuthTokens(user._id)
    res.status(StatusCodes.OK).send({data:{user, tokens}})
})

const refreshTokens = catchAsync( async(req, res) =>{

    const tokens = await authService.refreshAuthToken(req.body.refreshToken)
    //generate token
    res.status(StatusCodes.OK).send({data:{...tokens}})
})



module.exports = {
    register,
    login,
    refreshTokens
}