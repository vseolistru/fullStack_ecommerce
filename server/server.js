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
    //res.status(200).json({message:'all fine'})
    res.send(data.products)
});
async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};

startApp();