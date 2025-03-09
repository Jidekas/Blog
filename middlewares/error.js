const mongoose = require('mongoose');
const {env} = require('../config/config');
const ApiError = require('../utils/ApiError');
const {default: status} = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger')

const errorConverter = (err, req, res, next) => {
    let error = err
    if(!(error instanceof ApiError) ){
        const statusCode = error.statusCode || (error instanceof mongoose.Error 
            ? status.BAD_REQUEST 
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
    };
    res.locals.errorMessage = message
    if (config.env === "development"){
        logger.error(err)
    }
    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
    errorConverter,
}