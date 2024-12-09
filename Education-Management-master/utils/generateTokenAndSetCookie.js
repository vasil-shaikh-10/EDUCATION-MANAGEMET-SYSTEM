const cookie = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SetToken = async(userId,res)=>{
    try {
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'});

        res.status(201).cookie("jwt-EM",token,{
            maxAge:15 * 24 * 60 * 60 * 1000, // 15 days in MS
            httpOnly:true,
            sameSite:"strict"
        })
        return token;
    } catch (error) {
        console.log("Error SetToken :- ",error.message)
    }
}

module.exports = SetToken