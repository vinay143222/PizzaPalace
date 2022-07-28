import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import seedRouter from './routes/seedRoutes.js';
import pizzaRouter from './routes/pizzaRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log(err.message)
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAY_PAL_CLIENT_ID || 'sb');
})
app.use('/api/seed', seedRouter);
app.use('/api/products', pizzaRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
app.listen(5000, () => {
    console.log("server is started");
})