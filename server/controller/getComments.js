const {PostModel, CommentModel} = require("../models/PostModel");


async function getComments(req, res){
    let postId = req.query.postId;
    postId = postId.trim();
    const post = await PostModel.findById(postId);
    const comments = post.comments;
    const allComments = [];
    for (const com of comments) {
        const fetchComment = await CommentModel.findById(com);
        allComments.push(fetchComment);
    }
    res.status(200).json({
        msg : "Comments array",
        data : allComments
    })
}

module.exports = getComments;