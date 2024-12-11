const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profile_pic : {
        type : String,
        default : ""
    },
    department : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('DiscussionUser',userSchema);

module.exports = UserModel;