const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const toJson = require("@meanie/mongoose-to-json")

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
            },
            private: true
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

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.isPasswordMatch = async function(password){       //userShema.methods.xxx calls the function on an instatnce of userShema.
    const user = this
    return await bcrypt.compare(password, user.password)
}

userSchema.plugin(toJson)

const User = mongoose.model('User', userSchema);
module.exports = User
