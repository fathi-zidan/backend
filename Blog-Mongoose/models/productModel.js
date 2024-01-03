import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique:true
     },
     category:{
        type:String,
        required:true
     },
     isActive:{
        type : Boolean ,
     },
     details:{
        description :{
            type:String,
            required:true,
            minlength:[10,"at least 10 letters"]
        },
        price:{
            type:Number,
            required:true,
            min:[0,"price should be positive"]
        },
        discount:{
            type:Number,
            default:0
        },
        images:{
            type: [String],
            required:true
        },
        phoneNumber:{
            type:String,
            required:true,
            validate:{
                validator : function(){
                    const phoneRegex = /^[0-9]{10}$/;
                    return phoneRegex.test(this.phoneNumber);
                }
            }
        },
        dateAdded: {
            type: Date,
            default: Date.now
          }
     }


});
const Product = mongoose.model('Product',productSchema);
export default Product;