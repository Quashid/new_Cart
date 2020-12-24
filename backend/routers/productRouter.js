const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product= require("../models/productModel");
const {isAuth} = require("../utils.js")

const productRouter = express.Router();

productRouter.get("/",expressAsyncHandler(async (req,res)=>{
    const products=await Product.find({});
    res.send(products);

}));

productRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.category,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  );


productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));


productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
   
    const product=await Product.findById(req.params.id);
    console.log("product is",product);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:'product not found'});
    }
}))

module.exports = productRouter;