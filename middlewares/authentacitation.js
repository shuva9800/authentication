//create function for auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next) => {
    try{
        // console.log("body" ,req.body.token);
        // console.log("cookei" , req.cookies.shuva);
        // console.log("header", req.header("Authorization"));

        // extract jwt token from request body
        const token = req.body.shuva || req.cookies.shuva || req.header("Authorization").replace('Bearer ', '');

        if(!token || token=== undefined){
            return res.status(404).json({
                success: false,
                message:"token missing"
            })
        }
        //verify the token
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
             req.user= decoded;
        }
        catch(error){
            return res.status(404).json({
                success:false,
                message: "Token is invalid"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: error.message,
            message:" verification is invalid"
        })

    }
}

exports.isStudent = (req, res, next)=> {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"route is protected for Student only"
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message: error.message,
            message:"User role is not maching"
        })
    }
    next();
}

exports.isAdmin = (req, res, next)=> {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"route is protected for Admin only"
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message: error.message,
            message:"User role is not maching"
        })
    }
    next();
}

exports.isVisitor = (req, res, next)=> {
    try{
        if(req.user.role !== "Visitor"){
            return res.status(401).json({
                success:false,
                message:"route is protected for Visitor only"
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message: error.message,
            message:"User role is not maching"
        })
    }
    next();
}