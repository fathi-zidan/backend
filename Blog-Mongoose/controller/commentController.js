import STATUS_CODE from "../constants/statusCode.js";
import Comment from "../models/commentModel.js";

export const createComment = async(req,res,next)=>{
    try {
        const comment = await Comment.create(req.body);
        res.status(STATUS_CODE.OK).send(comment);
    } catch (error) {
        next(error)
    }
}
export const getAllComments=async(req,res,next)=> {
    try {
        const comments = await Comment.find();
        if(!comments){
            return res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(comments)
        
    } catch (error) {
        next(error)
    }
}
export const getCommentById = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(comment)
        
    } catch (error) {
        next(error)
        
    }
}
export const updateComment = async (req, res, next) =>{
    const id = req.body.id;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id , req.body,{new:true})
        if(!updateComment){
            return res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(updatedComment)
        
    } catch (error) {
        next(e)
    }
}
export const deleteComment = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if(!deletedComment){
            return  res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(deletedComment)
        
    } catch (error) {
        next(error);
    }
}