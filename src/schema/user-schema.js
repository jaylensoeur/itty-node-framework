import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password:String
}, {
    collection: 'users'
});


export default mongoose.model('User', UserSchema);
