const UserModel = require("../models/UserModel");
async function userDetails(req, res){
    const user = await UserModel.findOne({email : req.query.email});
    return res.status(200).json({
        msg : "user details",
        data : user
    });
}
module.exports = userDetails;