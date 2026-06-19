import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title:{
        type:String,
        required:true,
        default:"New Book"
    },
    author:{
        type:String,
        default:"New Author"
    },
    uploadedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    uploadedDate:{
        type:Date,
        default:Date.now
    }
});

export default model("Book", bookSchema);