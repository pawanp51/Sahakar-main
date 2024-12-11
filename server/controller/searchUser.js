const UserModel = require("../models/UserModel");
async function searchUser(req, res){
    const {search} = req.body;
    const query = new RegExp(search,"i","g")
    const user = await UserModel.find({
        "$or" : [
            { name : query },
            { email : query }
        ]
    }).select("-password")

    return res.json({
        message : 'all user',
        data : user,
        success : true
    })
}
module.exports = searchUser;