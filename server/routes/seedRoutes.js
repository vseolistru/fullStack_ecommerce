import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) =>{

    await User.remove({});
    const createdUser = await User.insertMany(data.users);


    await Product.remove({});
    const createProduct = await Product.insertMany(data.products);
    res.send({createProduct, createdUser});
});

export default seedRouter;