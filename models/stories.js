import { Schema, model, mongoose } from 'mongoose';

const story = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: {data: {type: Buffer, required: true}, contentType: {type: String, required: true}},
    url: { type: String, required: true },
});

const Story = model('Story', story);
Story.createIndexes();

export default Story;