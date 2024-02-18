const User= require('../model/user');
const bcrypt = require('bcrypt');


//signup route handler

exports.singup= async (req,res)=>{
    try{
        const{name,email,password, role} =req.body;
        const existUser= await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success: false,
                message:"User already exists"
            })
        }
       else{
        const newUser= await User.create({name,email,password, role});
        
       }
    }
    catch(error){

    }
}