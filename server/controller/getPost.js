const {PostModel} = require("../models/PostModel");
const UserModel = require("../models/UserModel");
async function getPost(req, res){
    const type = req.query.type;
    const userInfo = await UserModel.findOne({email : req.query.user});

    let userDepartment = userInfo?.department;
    if(type == 1){
        userDepartment = "inter";
    }
    const allPost = await PostModel.find({
        department : userDepartment
    });
    res.status(200).json({
        msg : "Required Posts",
        data : allPost
    })
}
module.exports = getPost;