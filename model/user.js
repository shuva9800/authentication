const mongoose = require('mongoose');


const userModel= new mongoose.Schema({
    name:{
        type:"string",
        required:true,
        trim:true,
    },
    email:{
        type:"string",
        required:true,
        trim:true,
    },
    password:{
        type:"string",
        required:true,
    },
    role:{
        type:"string",
        enum:["Admin", "Student", "Visitor"]
    }

})

module.exports = mongoose.model("user", userModel)