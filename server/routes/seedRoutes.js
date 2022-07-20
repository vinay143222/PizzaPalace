import express from 'express';
import Pizza from '../models/Pizza.js';
import User from '../models/users.js';
import data from '../data.js';
import data1 from '../userdata.js';
const seedRouter = express.Router();
seedRouter.get('/', async(req, res) => {
    await Pizza.deleteMany({});
    const createdPizzas = await Pizza.insertMany(data);
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data1.user);
    res.send({ createdPizzas, createdUsers });


})
export default seedRouter;