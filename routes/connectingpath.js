const express = require('express');
const router =express.Router();

const {login,singup}=require("../controller/auth");
const{auth, isStudent, isAdmin, isVisitor} = require("../middlewares/authentacitation");






router.post('/signup',singup);
router.post("/login",login);

//middleware invoce
router.get('/test', auth, (req,res) => {
    res.status(200).json({
        success: true,
        message:" welcome to test route"
    })
})

router.get('/student', auth, isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for student only"
    });
});

router.get('/admin', auth, isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for Admin  only"
    });
});

router.get("/visitor",auth, isVisitor ,(req,res) =>{
    res.status(200).json({
        success: true,
        message: "wellcome to the page ! if you come here then buy a course"
    })
})



module.exports =router;