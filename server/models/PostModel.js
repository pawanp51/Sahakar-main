const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        require : true
    },
    author :{
        type : String,
        require : true
    },
    postId : {
        type : mongoose.Schema.ObjectId,
        require : true,
        ref : "Posts"
    }
}, {
    timestamps : true
})
const PostSchema = new mongoose.Schema({
    author : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true
    },
    department : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true
    },
    comments : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Comments'
        }
    ],

},{
    timestamps : true
})
const CommentModel = mongoose.model("Comments", commentSchema);
const PostModel = mongoose.model('Posts', PostSchema);

module.exports = {
    PostModel,
    CommentModel
}