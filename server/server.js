import express from "express"
import jwt from 'jsonwebtoken'
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config";
import dotenv from "dotenv" 
import { connectDatabase } from "./config/database.js";
import routers from "./routes/routes.js";
import ExcelJS from 'exceljs';


dotenv.config({path: "./config/config.env"});


connectDatabase();

const app = express();
const corsOptions = { 
    origin :'http://localhost:3000',
    credential:true,
    optionSuccessStatus:200 
 } 

app.use(cors(corsOptions)) ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/',routers);

app.listen(process.env.PORT,()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});


