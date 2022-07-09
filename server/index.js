import express from 'express';
import data from './data.js';
const app = express();
app.get("/api/products", (req, res) => {
    res.send(data);
})
app.get("/api/products/id/:id", (req, res) => {
    const Pizza = data.find(x => x.id === req.params.id);
    if (Pizza) {
        res.send(Pizza);
    } else {
        res.status(404).send({ message: 'Pizza Not found' });
    }
})
app.get("/api/products/:id", (req, res) => {
    const Pizza = data.find((x) => x.id === req.params.id);
    if (Pizza) {
        res.send(Pizza);
    } else {
        res.status(404).send({ message: 'Pizza not found' });
    }
})

app.listen(5000, () => {
    console.log("server is started");
})