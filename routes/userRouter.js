import express from "express";
import User from "../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import verify from "../verifyToken.js";

const userRouter = express.Router();

userRouter.post(
    "/register",
    async(req,res)=>{

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            name:req.body.name,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString(),
        });

        console.log(newUser);

        try{
            await newUser.save();
            //res.status(201).json(user);
            res.redirect("/adminboard")
        }

        catch(err){
            res.status(500).json(err)
        }
    }
)

userRouter.get(
    "/seed",
    async(req,res)=>{
        const users = await User.find({});
        res.status(200).json(users);
    }
);

userRouter.get(
    "/user/:id",
    (req,res)=>{
        const {id} = req.params._id;
        res.redirect("/updateboard")
    }
)



//update user
userRouter.put(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.id === req.params.id){
            if(req.body.password){
                req.body.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString();
            }

            try{
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set : req.body,
                    },
                    {
                        new:true
                    }
                );
                res.status(200).json(updatedUser);
            }
            catch(err){
                res.status(403).json("You can only update your account");
            }
        }
    }

)


export default userRouter;