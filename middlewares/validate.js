const j = require('joi')
const { schema } = require("../validation/env.validation");
const ApiError = require('../utils/ApiError');


const validate = (schema) => (req, res, next)=>{
    // const keys = ['params', 'query', 'body'];
    const keys = Object.keys(schema);
    const object = keys.reduce((obj, key)=>{
        if(Object.prototype.hasOwnProperty.call(req, key)){
            obj[key] = req[key]
        }
        return obj
    }, {});

    const {value, error} = j.compile(schema).validate(object);

    if(error){
        const errors = error.details.map((detail)=> detail.message).join(',');

        // return res.status(400).send({error:true, errors})
        next(new ApiError(400, errors));
    }

    return next();
}

module.exports = validate