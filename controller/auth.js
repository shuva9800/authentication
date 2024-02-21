const User= require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


//signup route handler

exports.singup= async (req,res)=>{
    try{
        const{name,email,password, role} =req.body;
        const existUser= await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success: false,
                message:"User already exists"
            });
        }
      //secure password

      let securepassword;
      try{
        securepassword = await bcrypt.hash(password,10);
      } 
      catch(error){
        return res.status(500).json({
            success: false,
            message:"Error in hasing password"
        });
      }

      //entry in db
      const userentry = await User.create({name,email,password:securepassword, role});
      res.status(200).json({
        success:true,
        value:userentry,
        message:"user created successfully"
      })
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            success: false,
            message:"user cannot be regestared plesae try again",
            message:error.message
        })
    }
}

//login handler

exports.login = async (req, res)=>{
try{
  const {email, password}= req.body;
  if(!email || !password){
    return res.status(400).json({
      success:false,
      message:"fill all the require field"
    })
  }

  // check validations
  let user= await User.findOne({email});
  //user is present or not in db
  if(!user){
    return res.status(404).json({
      success:false,
      message:"You are not a register user atfirst signUp"
    })
  }

  const payload={
    email:user.email,
    id: user._id,
    role: user.role
  }
  //verify password & generate JWT token
  if(await bcrypt.compare(password, user.password)){
    //password match so crteate jwt token
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn: "5hr",
    });

    user = user.toObject();//find out why we need to create user to object where user is alraedy object?
    user.token = token;
    user.password= undefined;

    const option={
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    res.cookie("shuva",token, option).status(200).json({
      success:true,
      token,
      user,
      message:" user login successfully"
    })
  }
  else{
   return res.status(404).json({
      success:false,
      message:" password does't match try again"
    })
  }

}
catch(error){
   console.log(error);
   res.status(500).json({
    success:false,
    message:error.message,
    message: "error occure in server side try again some time leter"
   })
}

}