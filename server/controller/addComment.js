const { PostModel, CommentModel} = require("../models/PostModel");
async function addComment(req, res){
    const {postId, content, author} = req.body;
    const comment = new CommentModel({
        postId : postId,
        content : content,
        author : author
    })
    const commentSave = await comment.save();
    const commentId = commentSave._id;
    const postUpdate = await PostModel.updateOne(
        { _id: postId },
        { $push: { comments: commentId } }
    );
    res.status(201).json({
        msg : "Comment added"
    })
}
module.exports = addComment;