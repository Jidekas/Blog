const mongoose = require ('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email")
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password should contain at least one uppercase letter, one lowercase letter, one         number, and one special character")
                }
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.statics.isEmailtaken = async function(email){
    const user = await this.findOne({email});
    return !!user
}

const User = mongoose.model('User', userSchema);
module.exports = User
