import express from "express";
import Transaction from "../models/transaction.js";

const transactionRoute = express.Router();

transactionRoute.get(
    "/",
    (req,res)=>{
        res.send("Transaction server working")
    }
)

transactionRoute.post(
    "/register",
    async(req,res)=>{

        const account = new Transaction({

            accountUsername:req.body.accountUsername,
            accountNumber: req.body.accountNumber,
            accountBalance:req.body.accountBalance,
            accountType:req.body.accountType,
            accountCurrency:req.body.accountCurrency
        });

        console.log(account);

        try{
            await account.save();
            res.status(201).json(account);
            
        }

        catch(err){
            res.status(500).json(err)
        }
    }
)

transactionRoute.get(
    "/seed",
    async(req,res)=>{

        const createdAccount = await Transaction.find({});

        res.status(200).json(createdAccount);
    }
);

transactionRoute.get(
    "/:accountUsername",
    async(req,res)=>{

        const user_account = await Transaction.findOne({
            accountUsername:req.params.accountUsername
        });

        try{

            res.status(200).json(user_account);
        }

        catch(error){

            res.status(500).json(error);
        }
    }
)


export default transactionRoute;