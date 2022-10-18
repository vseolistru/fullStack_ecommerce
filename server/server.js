import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();
const DB_URL = process.env.DB_NAME;
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/seed',seedRouter );
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next)=>{
    res.status(500).json({message: err})
})

async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};

startApp();