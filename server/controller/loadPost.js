const {PostModel} = require("../models/PostModel");

async function loadPost(req, res){
    let postId = req.query.postId;
    postId = postId.trim();
    const post = await PostModel.findById(postId);
    res.status(200).json({
        msg : "Post details",
        data : post
    })
}
module.exports = loadPost;