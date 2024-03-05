import mongoose from "mongoose";
//import * as mongoose from "mongoose";
import dotenv from "dotenv" 
dotenv.config({path: "./config/config.env"});


export const connectDatabase = ()=> {
    mongoose.connect("mongodb://127.0.0.1:27017/MUJProject")
    .then((c) => {
        console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
        console.log(e);
    });
};