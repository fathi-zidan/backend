import Product from "../models/productModel.js";
import STATUS_CODE from "../constants/statusCode.js";

export const createProduct = async(req,res,next)=>{
    try {
        const product = await Product.create(req.body);
        res.status(STATUS_CODE.OK).send(product)
        
    } catch (error) {
        next(error)
    }
}