import express from "express";
import Product from "../models/Product.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) =>{
    await Product.remove({});
    const createProduct = await Product.insertMany(data.products);
    res.send({createProduct});
});

export default seedRouter;