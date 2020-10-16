const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    referralCode: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true,
        default:"active"
    }
},
{timestamps: true})

// adminSchema.pre('save', hasingPassword)

// adminSchema.methods.generateToken = confirmationToken

// adminSchema.statics.findByEmailAndPassword = async (email, password)=>{
//     try{
//         const admin = await Admin.findOne({email: email})
//         if(!admin) throw new Error('Invalid Credentials')
//         const isMatched = await compare(password, admin.password)
//         if(!isMatched) throw new Error('Invalid Credentials')
//         return admin
//     }catch(err){
//         err.name = 'authError'
//         throw err
//     }
// }

// adminSchema.methods.toJSON = function(){
//     const admin = this.toObject()
//     delete admin.password
//     delete admin.accessToken
//     delete admin.__v
//     return admin
// }


const Admin = mongoose.model('adminReferral', adminSchema)
module.exports = Admin