const {PostModel, CommentModel} = require("../models/PostModel");
async function postNewThread(req, res){
    const {title, content, department, author} = req.body;
    console.log(department);
    const post = new PostModel({
        title : title,
        content : content,
        department : department,
        author : author
    });
    const postSave = await post.save();
    res.status(201).json({
        msg : "post uploaded",
        data : post,
        success : true
    })

}
module.exports = postNewThread;