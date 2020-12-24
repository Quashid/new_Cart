const express = require("express");

const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter.js");
const orderRouter = require("./routers/orderRouter.js")
const productRouter = require("./routers/productRouter.js");
const dotenv = require("dotenv");

dotenv.config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

app.get('/',(req,res)=>{
    res.send("Server is Running");
})

app.get('/api/config/stripe',(req,res)=>{
    res.send(process.env.STRIPE_TEST_ID || 'SandBox');
})


app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter)
app.use('/api/product',productRouter);


app.use((err,req,res,next) =>{
    console.log("inside error",err);
    res.status(500).send({message:err.message});
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})