import express from "express";
const orderRouter = express.Router();
import expressAsyncHandler from "express-async-handler";
import {isAuth} from "../utils.js";
import Order from "../models/Order.js";

orderRouter.post('/', isAuth, async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map (item=>({...item, product: item._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user: req.user._id,
    });
    const order = await newOrder.save();
    res.json({order, message:'New order created'}).status(201);
});

orderRouter.get('/:id', isAuth, async (req, res ) => {
    try {
        const order = await Order.findById({_id: req.params.id})
        const {...data} = order._doc;
        return res.json(order).status(200)
    } catch (e) {
        res.status(501).send({message: "Order Not Found"})
    }


});

export default orderRouter;