import STATUS_CODE from "../constants/statusCode.js";
import Post from "../models/postsModel.js";

export const createPost = async(req,res,next)=>{
    try {
        const post = await Post.create(req.body);
        res.status(STATUS_CODE.CREATED).send(post);
    } catch (error) {
        next(error);
    }

}
export const getAllPosts = async(req,res,next)=>{
    try {
        const posts = await Post.find();
        if(!posts){
            return res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(posts);
        
    } catch (error) {
        next(error)
        
    }
}
export const getSinglePost = async(req,res,next)=>{
    const id= req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(post);
        
    } catch (error) {
        next(error);
        
    }
}
export const updatePost = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatePost){
            return  res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(updatedPost);
        
    } catch (error) {
        next(error)
        
    }
}
export const deletePost = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(id)
        if(!deletedPost){
            return  res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(deletedPost)
        
    } catch (error) {
        next(error)
        
    }
}