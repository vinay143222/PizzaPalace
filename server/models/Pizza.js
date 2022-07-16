import mongoose from 'mongoose';
const pizzaSchema = new mongoose.Schema({
    name: { type: String },
    varients: [],
    prices: { type: String },
    countInStock: { type: Number },
    category: { type: String },
    image: { type: String },
    description: { type: String }

}, { timestamps: true });
const Pizza = mongoose.model('pizza', pizzaSchema);
export default Pizza;