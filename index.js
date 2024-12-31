const express = require('express');
const Blog = require('./model/blog.model.js');
const mongoose  = require('mongoose');
const blogRoutes = require('./route/blog.route.js')
const {port, db_url} = require('./config/config.js')

const app = express()

mongoose.connect(db_url)
.then(()=>{
    console.log("DB connected")
 })
.catch((err)=>{
    console.error(err);
})
        
app.use(express.json())
 app.use('/',blogRoutes)
//app.post('/blog',createPost)

app.listen(port, ()=>{
    console.log(`running on port ${port}`)
})