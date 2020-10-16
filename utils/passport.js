const passport = require('passport')
const {Strategy: localStrategy} = require('passport-local')
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')


const User = require('../models/Users')
const Admin = require('../models/AdminReferral')


passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done)=>{
        try{
            let data = null
            if(email){
                const user = await User.findOne({email})
                if (user) {
                    const user = await User.findByEmailAndPassword(email, password)
                    data = user
                }
            }
            return done(null, data)
        }catch(err){
            if(err.name === 'authError') done(null, false, {message: err.message})
            done(err)
        }
    })
)

// passport-jwt Strategy for protective routes
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    ]), 
    secretOrKey: process.env.JWT_SECRET_KEY
}
passport.use(new JWTStrategy(jwtOptions, async ({id}, done)=>{
    try{
        let data = null
        if(id){
            const user = await User.findOne({_id: id})
            if (user) {
                console.log("in user")
                const user = await User.findById(id)
                if(!user) return done(null, false, {message: 'Invalid Credentials'})
                else data = user
            }
        }
        done(null, data)
    }catch(err){
        if(err.name === 'Error'){
            done(err)
        }
    }
})
)
