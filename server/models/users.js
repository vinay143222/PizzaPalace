import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, },
    password: { type: String, },
    isAdmin: { type: Boolean, default: false, }

}, {
    timestamps: true,
})
const User = mongoose.model('user', userSchema);
export default User;