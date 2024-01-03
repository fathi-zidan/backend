import mongoose from "mongoose";
import User from "./userModel.js";
import Post from "./postsModel.js";

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: [true, "Body field cannot be empty"]
    }

}, { timestamps: true })

const Comment = mongoose.model('Comment',commentSchema);
export default Comment;