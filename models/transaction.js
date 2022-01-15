import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({

    accountUsername:{
        type:String,
        required:true,
        unique:true
    },
    accountNumber:{
        type:String,
        required:true,
        unique: true
    },
    accountCurrency:{
        type:String,
        required:true
    },
    
    accountBalance:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;