import {Schema, model} from 'mongoose';

const caseSchema = new Schema({
    name: { type : String, required : true},
    description: { type : String, required : true},
    image: { 
        data: Buffer, 
        contentType: String 
    },
    total: { type : Number, required : true},
    collected: { type : Number, required : true},
});

const Case = model('Case', caseSchema);
Case.createIndexes();

export default Case;