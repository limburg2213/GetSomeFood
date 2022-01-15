import express from "express";
import Admin from "../models/admin.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import session from "express-session";
import logout from "express-passport-logout";

//Admin Account
const adminRouter = express.Router();
const logOut=logout();

//Register admin
adminRouter.post(
    "/register",
    async(req,res)=>{

        const newAdmin = new Admin({

            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString()
        });

        //console.log(newAdmin);

        try{
            
            const admin = await newAdmin.save();
            res.status(201).json(admin);
        }

        catch(error){
            res.status(500).json(error);
        }
    }
);

adminRouter.post(
    "/login",
    async(req,res)=>{

        try{
            const admin = await Admin.findOne({
                username: req.body.username
            });
            !admin && res.status(401).json("Wrong password or username...!");

            const bytes = CryptoJS.AES.decrypt(admin.password, process.env.SECRET_KEY);

            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            originalPassword !== req.body.password && 
                res.status(401).json("Wrong password or username....!!");

            const accessToken = jwt.sign({
                id: admin._id,

            },

            process.env.SECRET_KEY,
            {expiresIn:"5d"}

            );

            const {password, ...info} = admin._doc;

            //res.status(200).json({...info, accessToken});
            res.redirect('/adminboard');
        }

        catch(error){
            res.status(500).json(error);
        }
    }
)



export default adminRouter;

