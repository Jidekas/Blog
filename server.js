const express = require('express');
const app = express()
const blogRoutes = require('./route/blog.route.js')
const authRoutes = require('./route/auth.route.js')
const {errorHandler, errorConverter} = require('./middlewares/error.js')
const {default: status} = require('http-status')
const ApiError = require('./utils/ApiError.js')
const morgan = require('./config/morgna.js')

app.use(morgan.successHandler)
app.use(morgan.errorHandler)
app.use(express.json());
app.use('/',blogRoutes);
app.use('/',authRoutes);
app.use((req, res, next)=>{
    next(new ApiError(status.NOT_FOUND, status[status.NOT_FOUND]))
})
app.use(errorConverter);
app.use(errorHandler);


module.exports = app