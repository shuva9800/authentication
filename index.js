const express = require('express');
const app = express();
require("dotenv").config();

const port= process.env.PORT || 3000;
app.use(express.json());

const {dbconnect} = require('./config/database');
dbconnect();

//import route and mounte
const routepath =require('./routes/connectingpath');
app.use("/api/v1", routepath);


app.listen(port, ()=>{
    console.log("applicetion started successfully");

})

app.get("/", (req,res)=>{
    res.send("<h1>home page is render</h1>")
})