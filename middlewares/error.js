const mongoose = require('mongoose');
const {env} = require('../config/config');
const ApiError = require('../utils/ApiError');
const {default: status} = require('http-status')

const errorConverter = (err, req, res, next) => {
    let error = err
    if(!(error instanceof ApiError) ){
        const statusCode = error.statusCode || (error instanceof mongoose.Error 
            ? status.INTERNAL_SERVER_ERROR 
            : status.INTERNAL_SERVER_ERROR);
        const message = error.message || status[statusCode];
        error = new ApiError(statusCode, message, false, error.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, next)=>{
    const {statusCode, message} = err;

    const response = {
        error: true,
        code: statusCode,
        message,
        ...(env==="development" && {stack: err.stack})
    }
    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
    errorConverter,
}