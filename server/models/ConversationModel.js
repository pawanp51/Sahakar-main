const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    },
    msgByUserId :{
        type : mongoose.Schema.ObjectId,
        require : true,
        ref : "DiscussionUser"
    }
}, {
    timestamps : true
})
const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        require : true,
        ref : "DiscussionUser"
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        require : true,
        ref : "DiscussionUser"
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
},{
    timestamps : true
})
const MessageModel = mongoose.model("Message", messageSchema);
const ConversationModel = mongoose.model('Conversation', conversationSchema);

module.exports = {
    MessageModel,
    ConversationModel
}