import express from 'express';
import Order from '../models/order.js';
import bcrypt from 'bcryptjs';
import { isAuth } from '../utlis.js';
import expressAsyncHandler from 'express-async-handler';
const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {

    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x, pizza: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        shippingPrice: req.body.shippingPrice,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,



    })
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order is Created', order });
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {

    const orders = await Order.find({ user: req.user._id });

    res.send(orders);
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }

}));
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,

        };
        const updateOrder = await order.save();
        res.status(200).send({ message: 'Order is Paid', order: updateOrder });
    } else {
        res.status(404).send({ message: 'Order is not Found' })
    }
}))
export default orderRouter;