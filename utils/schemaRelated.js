const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

module.exports = { 
    hasingPassword : async function(next){
        const user = this
        try{
            if(user.isModified('password')){
                const hp = await hash(user.password, 10)
                user.password = hp
                next()
            }
        }catch(err){
            next(err)
        }
    },

    async confirmationToken(){
        const user = this
        const accessToken = await sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '12h'})
        user.accessToken = accessToken 
        await user.save()
        return accessToken
    }
}
