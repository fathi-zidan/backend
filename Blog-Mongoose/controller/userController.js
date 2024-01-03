import STATUS_CODE from "../constants/statusCode.js";
import User from "../models/userModel.js";

export const createUser = async(req,res,next)=>{
    try {
        const user = await User.create(req.body);
        res.status(STATUS_CODE.OK).send(user);
    } catch (error) {
        next(error)
        
    }
}
export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(STATUS_CODE.NOT_FOUND).send("no users found")
        }
        res.status(STATUS_CODE.OK).send(users);
        
    } catch (error) {
        next(error);
    }
}
export const getUser = async(req,res,next)=>{
    const id= req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(STATUS_CODE.NOT_FOUND).send("user was not found")
        }
        res.status(STATUS_CODE.OK).send(user);
        
    } catch (error) {
        next(error);
    }
}
export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true})
        if (!updatedUser) {
            res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.OK).send(updatedUser);
        
    } catch (error) {
        next(error);
        
    }
}
export const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return  res.status(STATUS_CODE.NOT_FOUND)
        }
        res.status(STATUS_CODE.NO_CONTENT).send(deletedUser)
        
    } catch (error) {
        next(error)
    }

}