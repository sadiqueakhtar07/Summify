import {Schema, model} from 'mongoose';

const summarySchema = Schema({
    bookId:{
        type: Schema.Types.ObjectId,
        ref: "Book",
        required:true,
    },
    summaryText:{
        type:String,
        required:true
    },
    summaryType:{
        type:String,
        enum:["Short", "Detailed", "Default"],
        required:true,
        default:"Default"
    }
},
{
    timestamps: true
});

export default model("Summary", summarySchema);