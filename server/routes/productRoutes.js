import express from "express";
import Product from "../models/Product.js";
const productRouter = express.Router();


productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products).status(200)
});

productRouter.get('/slug/:slug',async (req, res)=>{
    const product = await Product.findOne({slug: req.params.slug});
    product ? res.send(product) : res.status(404).json({message: "product not found"})
});

productRouter.get('/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    product ? res.send(product) : res.status(404).json({message: "product not found"})
});

export default productRouter;