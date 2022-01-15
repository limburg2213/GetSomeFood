import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import dashboard from "./routes/dashboard.js";
import session from "express-session";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import transactionRoute from "./routes/transactionRoute.js";




const app = express();
const port = process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
)
.then(()=> console.log("DB Connected Successfully......!!!!"))
.catch((err)=> console.log(err));

app.use("/api/admin",adminRouter);
app.use("/api/user", userRouter);
app.use("/api/transaction",transactionRoute)
//app.use("/api/dashboard", dashboard)


app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use('/static', express.static('public'))
app.use(cookieParser());

var sess;

app.use(session(
    {
        secret:'lama',
        saveUninitialized:true,
        resave:true
    }
))

app.get(
    "/",
    (req,res)=>{
        res.sendFile(__dirname + "/public/login.html");
    }
)

app.get(
    "/adminboard",
    (req,res)=>{
        sess= req.session;
        res.sendFile(__dirname + "/public/dashboard.html");
    }
)

app.get(
    "/updateboard",
    (req,res)=>{
        res.sendFile(__dirname + "/public/updateUser.html");
    }
)


// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
  });



app.listen(
    port,
    ()=>{
        console.log(`Server started on ${port}`);
    }
)
