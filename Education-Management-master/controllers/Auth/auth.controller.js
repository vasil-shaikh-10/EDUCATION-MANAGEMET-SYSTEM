const User = require("../../models/Auth/auth.models");
const SetToken = require("../../utils/generateTokenAndSetCookie");

const Register = async(req,res) =>{
    try {
        let {username,email,password,role} = req.body
        if(!username || !email || !password || !role){
            res.status(400).json({message:"All Filed Required."})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid Email"})
        }

        if(password.length < 6 ){
            return res.status(400).json({success:false,message:"Password must be at least 6 characters"})
        }

        let UserExtits = await User.findOne({email:email})
        console.log("UserExtits",UserExtits)
        if(UserExtits){
            return res.status(400).json({success:false,message:"Email already exists"})
        }
        let userObj = new User({
            username,
            email,
            password,
            role
        })
        SetToken(userObj._id,res)
        await userObj.save()
        res.status(201).json({success:true,user:{
            ...userObj._doc,
            password:""
        }})
    } catch (error) {
        console.log('Error In Register Controller :- ',error.message);
        res.status(500).json({message:'Internal Error :- ',error:error})
    }
}

const Login = async(req,res)=>{
    try {
        let {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"All Filed Required."})
        }

        let UserExtits = await User.findOne({email:email})

        if(UserExtits == null){
            res.status(201).send({success:false,message:'Email Not Match..'});
        }

        const isPasswordMatch = await UserExtits.comparePassword(password)
        if(isPasswordMatch){
            await SetToken(UserExtits._id,res)
            res.status(201).json({success:true,user:{
                ...UserExtits._doc,
                password:""
            }})
        }else{
            res.status(404).send({success:false,message:'Password Not Match.'})
        }
    } catch (error) {
        console.log('Error In Login Controller :- ',error.message);
        res.status(500).json({message:'Internal Error :- ',error:error})
    }
}
module.exports = {Register,Login}