import {Schema, model} from 'mongoose';

const rawSchema = Schema({
    bookId:{
        type: Schema.Types.ObjectId,
        ref:"Book"
    },
    fullText:{
        type:"String",
        required:true
    }
});

export default model("RawData", rawSchema);