const { tokenTypes } = require('../config/tokens');
const { userService, tokenService } = require('.');
const ApiError = require('../utils/ApiError')
const {StatusCodes} = require('http-status-codes');
const { verifyToken } = require('./token.service');



const login = async(email, password)=>{
    const user = await userService.getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))){
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user
}

const refreshAuthToken = async(refreshToken)=>{
    try {
        const user = await userService.getUserById("67d26c2d46d8cbd94a4897e8")
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH) 
       if (!user) {
        throw new Error();
      }
      await refreshTokenDoc.deleteOne();
      return tokenService.generateAuthTokens(user.id)
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, error.message)
    }
};

module.exports = {
    login,
    refreshAuthToken
}