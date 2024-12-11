const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect("mongodb+srv://pawan:pawanpatil51@cluster0.bzdcd.mongodb.net/", {
        dbName: 'Sahakar',
    });
    const connection = mongoose.connection;
    connection.on('connected',() => {
        console.log("Connected to DB");
    })
    connection.on("error", (error)=>{
        console.log("Something wrong in mongodb ", error);
    })
}
module.exports = connectDB;