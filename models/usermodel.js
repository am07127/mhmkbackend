import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    Name: { type : String, required : true},
    Email: { type : String, required : true},
    Password: { type : String, required : true},
});

const User = model('user', UserSchema);
User.createIndexes();

export default User;