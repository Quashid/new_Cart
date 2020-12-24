
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order= require("../models/orderModel");
const {isAuth} = require("../utils.js")
const orderRouter = express.Router();

orderRouter.post('/',
isAuth,
expressAsyncHandler(async (req,res)=>{
    if(req.body.orderItems === 0)
    {
        res.status(400).send({message:"Cart is Empty"});
    }
    else{
       
        const order = new Order( 
            {
                seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
              });
        const createOrder = await order.save();
        res.status(201).send({message:'new order created',order:createOrder});
    }
}))

orderRouter.get('/:id',isAuth,expressAsyncHandler(async (req,res)=>{
    const order= await Order.findById(req.params.id);
    if(order)
    {
        res.send(order);
    }
    else{
        res.status(404).send({message:'Order Not Found'});
    }
}))

orderRouter.get(
    '/mine/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.params.id });
      res.send(orders);
    })
  );
module.exports = orderRouter;