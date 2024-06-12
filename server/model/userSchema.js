import mongoose from "mongoose";
import dotenv from "dotenv" 
dotenv.config({path: "./config/config.env"});


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to the database');
})
.catch((e)=>{
    console.log('Failed');
})

const signupSchema = new mongoose.Schema({
    name:{
        type: String,required: true,trim: true,min:5, max:100
    },
    email:{
        type:String,unique:true,required:true,lowercase:true,trim:true
    },
    phone:{
        type:Number,required:true 
    },
    password:{
        type:String,required:true,minlength:60,maxlength:60  
    },
    role:{
        type: String, enum: ['user', 'admin']
    }
});
const  usermodel = mongoose.model('mujRegistration', signupSchema);


// postUserData schema

const userDataSchema = new mongoose.Schema({
    ticketNumber:{
        type:String,
    },
    status:{
        type: String,required: false,
    },
    name:{
        type: String,required: true,trim: true,min:5, max:100
    },
    email:{
        type:String,required:true,lowercase:true,trim:true
    },
    department:{
        type:String, required:true, trim:true
    },
    subject:{
        type:String,unique:false,required:true
    },
    location:{
        type: String,required: true,trim: true,
        enum:['Delhi', 'Uttar pradesh', 'Madhya pradesh', 'Maharashtra', 'Rajasthan'] 
    },
    bankName:{
        type:String,unique:false,required:true,
        enum:['Bank of Baroda', 'HDFC Bank', 'Axis Bank']
    },
    category:{
        type: String,required: true,trim: true,
        enum:['Low', 'Midium', 'High']
    },
    subCategory:{
        type:String,unique:false,required:true,
        enum:['Helpdesk L1', 'Helpdesk L2', 'Helpdesk L3']
    },
    description:{
        type:String,unique:false,required:false,
    }
  },{timestamps:true}
  );

const userDataModel = mongoose.model('userTable', userDataSchema);

export { usermodel, userDataModel };

