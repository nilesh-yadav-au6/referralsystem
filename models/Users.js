const mongoose = require('mongoose')
const { compare } = require('bcryptjs')
const Schema = mongoose.Schema
const { hasingPassword, confirmationToken } = require('../utils/schemaRelated')
const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    earning:{
        type: Number,
        trim: true,
        default: 0
    },
    empReferralCode:{
        type: String,
        trim: true
    },
    accessToken:{
        type: String,
        trim: true
    },
    password: {
        type: String,
        required:true
    }
},
{timestamps: true})

userSchema.pre('save', hasingPassword)
userSchema.methods.generateToken = confirmationToken

userSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const user = await User.findOne({email: email})
        if(!user) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, user.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return user
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

// function to removing some confidential information of user while sending the response at client side
// although this will be present in db

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.accessToken
    delete user.__v
    return user
}

const User = mongoose.model('users', userSchema)
module.exports = User