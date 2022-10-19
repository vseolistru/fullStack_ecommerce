import express from "express";
const orderRouter = express.Router();
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

orderRouter.get('/mine', isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

orderRouter.get('/:id', isAuth, async (req, res ) => {
    try {
        const order = await Order.findById({_id: req.params.id})
        return res.json(order).status(200)
    } catch (e) {
        res.status(501).send({message: "Order Not Found"})
    }

});

orderRouter.put('/:id/pay', isAuth, async (req,res) => {
    const order = await Order.findById({_id: req.params.id})
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.is,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save();
        res.json({message: 'Order Paid', order: updateOrder})
    }
    else {
        res.status(404).send({message: "Order Not Found"})
    }
});




export default orderRouter;