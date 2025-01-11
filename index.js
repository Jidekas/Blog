const mongoose  = require('mongoose');
const {port, db_url} = require('./config/config.js')
const http = require('http')
const app = require('./server')
const logger = require('./config/logger.js')



mongoose.connect(db_url)
.then(()=>{
    logger.info("DB connected")
 })
.catch((err)=>{
    logger.error(err);
})
        


const httpServer = http.createServer(app)
const server = httpServer.listen(port, ()=>{
    logger.info(`running on port ${port}`)
})


const exitHandler = () =>{
    if(server){
        server.close(()=>{
            logger.info('server closed');
            process.exit(1);
        })
    } else {
        process.exit(1);
    }
}

const  unexpectedErrorHandler = (err) =>{
    logger.error(err)
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)
process.on("SIGTERM", ()=>{
    logger.info("SIGTERM recieved");
    if(server){
        server.close()
    }
})