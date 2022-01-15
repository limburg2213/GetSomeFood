import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


const app = express;
const dashboard = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));


dashboard.get(
    "/admin",
    (req,res)=>{
        res.sendFile(path.join(__dirname, "../public/dashboard.html"))
    }
)

export default dashboard;