import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String },
        quantity: { type: String },
        image: { type: String },
        prices: { type: Number },
        pizza: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pizza',
        }
    }],
    shippingAddress: {
        fullName: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    paymentMethod: { type: String },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }

}, { timestamps: true });
const Order = mongoose.model('order', orderSchema);

export default Order;