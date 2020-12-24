
const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const User = require("../models/userModel.js");
const bcrpyt = require("bcryptjs");
const { generateToken } = require("../utils.js");
const {isAuth} = require("../utils.js")

const userRouter = express.Router();

userRouter.get('/seed',expressAsyncHandler(async (req,res)=>{

   

    const createUser = await User.insertMany(data.users);
    res.send({createUser});
}));

userRouter.post('/signin',expressAsyncHandler(async (req,res)=>{
    const user= await User.findOne({email: req.body.email});
  
    if(user)
    {
        if(bcrpyt.compareSync(req.body.password,user.password))
        {
         
            const dataTosend = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
              };
              
            res.send(dataTosend);
         
            return;
            
        }
        else
        {
            res.status(401).send({message:'invalid email or password'});
        }
    }
    else{
        res.status(401).send({message:'invalid email or password'});
    }
}))


userRouter.post('/register', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: bcrpyt.hashSync(req.body.password, 8)
    })

    const createdUser = await user.save();
    const dataTosend = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(createdUser),
      };
      
    res.send(dataTosend);
      
});

userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );


  userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (user.isSeller) {
          user.seller.name = req.body.sellerName || user.seller.name;
          user.seller.logo = req.body.sellerLogo || user.seller.logo;
          user.seller.description =
            req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
          user.password = bcrpyt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(updatedUser),
        });
      }
    })
  );

module.exports = userRouter;