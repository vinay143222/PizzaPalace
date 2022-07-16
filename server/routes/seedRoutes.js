import express from 'express';
import Pizza from '../models/Pizza.js';

import data from '../data.js';
const seedRouter = express.Router();
seedRouter.get('/', async(req, res) => {
    await Pizza.deleteMany({});
    try {
        const createdPizzas = await Pizza.insertMany(data);
        res.send({ createdPizzas });
    } catch (error) {
        console.log(error.message);
    }


})
export default seedRouter;