const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req,res){
    const {username,email,password}=req.body

    if(!username || !email || !password){
        return res.status(400).json({message:"Please provide username, email and password"})
    }

    const iseUserAlreadyExists = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(iseUserAlreadyExists){
        /* isUserAlreadyExists.username==username */
        return res.status(400).json({
            message:"Account already exists with this email address or username"
        })
    }
    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign(
        { is:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports={
    registerUserController
}