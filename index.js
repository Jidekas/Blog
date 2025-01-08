const express = require('express');
const Blog = require('./model/blog.model.js');
const mongoose  = require('mongoose');
const blogRoutes = require('./route/blog.route.js')
const {port, db_url} = require('./config/config.js')
const {errorHandler, errorConverter} = require('./middlewares/error.js')
const {default: status} = require('http-status')
const ApiError = require('./utils/ApiError.js')

const app = express()

mongoose.connect(db_url)
.then(()=>{
    console.log("DB connected")
 })
.catch((err)=>{
    console.error(err);
})
        
app.use(express.json());
app.use('/',blogRoutes);
app.use((req, res, next)=>{
    next(new ApiError(status.NOT_FOUND, status[status.NOT_FOUND]))
})
app.use(errorConverter);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`running on port ${port}`)
})