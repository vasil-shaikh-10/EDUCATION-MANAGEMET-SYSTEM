
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const User = require('../models/Auth/auth.models')
const CheckAdmin = async(req,res,next)=>{
    try {
        let token = req.cookies['jwt-EM']
        if(!token){
            res.status(401).json({success:false,message:"Unauthorized - No Token Provided"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            res.status(401).json({success:false,message:"Unauthorized - Invalid Token"})
        }  
        let user = await User.findById(decode.userId)
        if(!user){
            res.status(404).json({success:false,message:"User Not Found."})
        }
        req.user = user;
        next()
    } catch (error) {
        console.log('Error in CheckAdmin Middleware :- ',error.message)
    }
}

module.exports = CheckAdmin