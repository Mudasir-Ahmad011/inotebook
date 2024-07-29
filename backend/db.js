const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/inotebook"

const connecttomongoose=()=>{
    mongoose.connect(mongooseURI);
    console.log("Successfull");
}


module.exports = connecttomongoose;