const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config')
morgan.token('message', (req, res)=> res.locals.errorMessage || "") 
const getIpFormat = ()=> (config.env === "production"? ":remote-addr - ": "")
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../logs/access.logs'),
    {flags:'a'}
)

const sucessResponseformat = `${getIpFormat()} :method :url :status :response-time ms :user-agent :date`
const successHandler = morgan(sucessResponseformat,{
    stream: accessLogStream,
    skip: (req, res) => res.statusCode >= 400,
});
const errorResponseformat = `${getIpFormat()} :method :url :status :response-time ms :user-agent :date - error-mesage: :message`
const errorHandler = morgan(errorResponseformat,{
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
});

module.exports = {
    successHandler,
    errorHandler
}