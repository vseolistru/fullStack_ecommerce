import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import data from "./data.js";

dotenv.config();
const DB_URL = process.env.DB_NAME;
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get('/api/products', (req, res)=>{
    res.send(data.products)
});
app.get('/api/products/slug/:slug', (req, res)=>{
    const product = data.products.find(x=> x.slug === req.params.slug);
    product ? res.send(product) : res.status(404).json({message: "product not found"})
});

async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};

startApp();