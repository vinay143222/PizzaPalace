import express, { response } from 'express';
import Pizza from '../models/Pizza.js';
import { isAuth, isAdmin } from '../utlis.js';
import expressAsyncHandler from 'express-async-handler';
const pizzaRouter = express.Router();
pizzaRouter.get('/', async(req, res) => {
    const Pizzas = await Pizza.find();
    res.send(Pizzas);
})
pizzaRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const newProduct = new Pizza({
            name: 'sample name ' + Date.now(),
            image: '/images/p1.jpg',
            prices: 0,
            varients: ['small', 'medium', 'large'],
            category: 'sample category',
            countInStock: 0,
            description: 'sample description',
        });
        const product = await newProduct.save();
        res.send({ message: 'Pizza Created', product });
    })
);
pizzaRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const productId = req.params.id;
        const product = await Pizza.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.prices = req.body.prices;
            product.image = req.body.image;

            product.category = req.body.category;

            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            await product.save();
            res.send({ message: 'Product Updated' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);
pizzaRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        console.log(req.params.id);
        const product = await Pizza.findById(req.params.id);

        if (product) {
            await product.remove();
            res.send({ message: 'Product Deleted' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);
pizzaRouter.get("/search", expressAsyncHandler(async(req, res) => {
    const category = req.query.category;
    const pizzas = await Pizza.find({ category: req.query.category });
    res.send(pizzas);
}))
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