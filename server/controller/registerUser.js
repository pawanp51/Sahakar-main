const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
async function registerUser(req, res){
    try{
        const { name, email, password, profile_pic, department} = req.body;
        const emailExist = await UserModel.findOne({email});
        if(emailExist){
            return res.status(400).json({
                msg : "Already registered",
                error : true
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const user = new UserModel({
            name : name,
            email : email,
            password : hashPassword,
            profile_pic : profile_pic,
            department : department
        })
        const userSave = await user.save();
        res.status(201).json({
            msg : "user registered",
            data : userSave,
            success : true
        })
    }catch (error){
        return res.status(500).json({
            msg : error.message || error,
            error : true
        })
    }
}

module.exports = registerUser;