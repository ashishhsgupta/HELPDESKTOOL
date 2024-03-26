import express from "express"
import jwt from 'jsonwebtoken'
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config";
import dotenv from "dotenv" 
import { connectDatabase } from "./config/database.js";
import routers from "./routes/routes.js";
import ExcelJS from 'exceljs';
// import fs from 'fs';

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

// app.get('/data',(req, res) => {
//     res.send("I am in the route");
// })
// app.get('/downloadReport', async(req, res)=> {
//     try{
//        const workbook = new ExcelJS.Workbook();
//        const worksheet = workbook.addWorksheet('Report');
//        worksheet.addRow([ 'Name','Email','Phone Number']);
//        worksheet.addRow(['ashish','a@gmail.com',983456789]);
//        const filePath =  './temp/report.xlsx';
//         await workbook.xlsx.writeFile(filePath);
//         res.download(filePath, 'report.xlsx',(err)=>{
//             fs.unlinkSync(filePath);
//         });
//     }catch(error){
//         console.error('Error generating report:', error);
//         res.status(500).send('Internal server error');
//     }
// });

app.use('/',routers);

app.listen(process.env.PORT,()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});


