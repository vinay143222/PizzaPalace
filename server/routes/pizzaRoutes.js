import express, { response } from 'express';
import Pizza from '../models/Pizza.js';
import expressAsyncHandler from 'express-async-handler';
const pizzaRouter = express.Router();
pizzaRouter.get('/', async(req, res) => {
    const Pizzas = await Pizza.find();
    res.send(Pizzas);
})
pizzaRouter.get('/categories', expressAsyncHandler(async(req, res) => {
    const categories = await Pizza.find().distinct('category');
    res.send(categories);

}))
pizzaRouter.get("/id/:_id", async(req, res) => {
    try {
        const Pizzas = await Pizza.findById(req.params._id);

        if (Pizzas) {
            res.send(Pizzas);
        } else {
            res.status(404).send({ message: 'Pizza Not found' });
        }
    } catch (error) {
        console.log(error.message);
    }


})
pizzaRouter.get("/:_id", async(req, res) => {

    try {
        const Pizzas = await Pizza.findById(req.params._id);
        if (Pizzas) {
            res.send(Pizzas);
        } else {
            res.status(404).send({ message: 'Pizza not found' });
        }
    } catch (error) {
        console.log(error.message);
    }

})
export default pizzaRouter;