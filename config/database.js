const mongoose = require('mongoose');

require("dotenv").config();

exports.dbconnect= ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {console.log("DataBase Connection Successful")})
    .catch( (error) => {console.log("Recieved an error" + error)} );
}