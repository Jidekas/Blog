const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const config = require("../config/config")
const {tokenTypes} = require("../config/tokens"); 
const { Token } = require('../model');

const saveToken = async (token, userId, expires, type, blacklisted=false)=>{
    return await Token.create({
        token,
        user: userId,
        expires,
        type,
        blacklisted
    })
}

const generateToken  = (userId, expires, type, secret =config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: dayjs().unix(),
        exp: expires.unix(),
        type
    }

    return jwt.sign(payload, secret)
}

const generateAuthTokens  = async(userId) => {
    const accessTokenExp = dayjs().add(config.jwt.accessTokenExpirationMins, 'minutes')
    const accessToken = generateToken(userId, accessTokenExp, tokenTypes.ACCESS)

    
    const refreshTokenExp = dayjs().add(config.jwt.refreshTokenExpirationDays, 'days')
    const refreshToken = generateToken(userId, refreshTokenExp, tokenTypes.REFRESH)
    await saveToken(refreshToken, userId, refreshTokenExp, tokenTypes.REFRESH)
    

    return {
        access:{
            token: accessToken,
            expires: accessTokenExp.toDate()
        },
        refresh:{
            token: refreshToken,
            expires: refreshTokenExp.toDate()
        }
    }
}

const verifyToken = async(token, type)=>{
    const payload = jwt.verify(token, config.jwt.secret)
    const tokenDoc = await Token.findOne({
        token,
        user: payload.sub,
        type, 
        blacklisted: false
    })
    if(!tokenDoc){
        throw new Error('token not found')
    }
    return tokenDoc;
}

module.exports  = {
    generateToken,
    generateAuthTokens,
    verifyToken
}