import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }

}, {
    timestamps: true,
})
const User = new mongoose.model('user', userSchema);
export default User;