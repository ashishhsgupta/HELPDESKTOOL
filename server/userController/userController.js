//import express, { request } from 'express';
import { usermodel, userDataModel } from '../model/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import exceljs from 'exceljs';
import express from 'express';

export const usersignup=async(request,response)=>{
    try{
        console.log('request.body',request.body);
        const { name, email, phone, password, role } = request.body;
        const existingUser = await usermodel.findOne({ email });
        if(existingUser){
            console.log('username already assign one role');
            return response.status(401).json({ warning:'Already assign one role'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ name, email, phone, password:hashedPassword, role });
        await newUser.save();
        console.log('User created successfully');
        return response.status(201).json({message:'user created successfully'});
    }catch(error){
        console.error('Error craeting user:', error.message);
        return response.status(401).json('Internal server issue');
    }
};

const generateAuthToken = async (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKeyUnchahar183', {
        expiresIn: '1d'
    });  
  };

export const usersignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            console.log('user not found');
            return res.status(400).json({ error: 'Invalid credentials!!!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('invalid password:', password)
        console.log('Hashed password is database:', user.password);
        console.log('Password comprison:', isMatch);
        if (!isMatch) {
            console.log('Invalid password');
            return res.status(400).json({ error: 'Invalid credential' });
        }
        const token = generateAuthToken(user);
        console.log('Login successfully');
        res.json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

 export const ticketCount = async(req, res)=>{
    try {
        const count = await userDataModel.countDocuments();
        res.json({ count });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
      }
 }

//  export const updatePassword = async(req, res)=>{
//     try{
//         let newPassword = new userDataModel(req.body);
//         const user = await userDataModel.findOne({email: req.body.email});
//         if(!user){
//             return res.status(400).json({error: 'User not found!'});
//         }
//     }catch(error){
//         console.error(error);
//     }
//  }

export const postUserData = async(req, res)=>{
    try{
        console.log('req.body',req.body)
        let userData = new  userDataModel(req.body); 
        const lastTicket = await userDataModel.findOne({}, {}, {sort:{'createdAt': -1}});       
     let lastTicketNumber = lastTicket ? parseInt(lastTicket.ticketNumber.replace(/[^\d]/g, '')): 0;

if(isNaN(lastTicketNumber)){
    lastTicketNumber = 0;
}
const nextTicketNumber = (++lastTicketNumber).toString().padStart(4, '0');
const ticketPrefix = 'A';

const ticketNumber = ticketPrefix + nextTicketNumber;
userData["ticketNumber"] = ticketNumber;
userData["status"] = "Pending";

const savedUser = await userData.save();
res.status(201).json({ ticketNumber});
    } catch (error) {
        res.status(500).json({ error: error.message});
        console.log(error);
    }
};
    

export const updateRecords = async(request,res)=> {
    try{
       const id= request.params.id;
       const userExist = await userDataModel.findOne({_id:id})
       if(!userExist){
        return res.status(404).json({message:'user not found'});
       }
       console.log(userExist,"userExist++")
       //request.body["status"] = userExist["status"] || "";
       const updatedUser= await userDataModel.findByIdAndUpdate(id, request.body,{new: true})
       res.status(201).json(updatedUser);

    }catch(error){
       res.status(500).json({error: 'Internal server error'})
    }
}

export const deleteRecord  = async (request, response) => {
    try{
        // const id= req.params.id;
         const userExist = await userDataModel.findOne({ _id : request.params.id })
         if (!userExist) {
             return response.status(404).json({ message: 'user not found.' });
    }
    await userDataModel.findByIdAndDelete(request.params.id);
    
    response.status(200).json({ message: 'Deleted Successfully!' });
}catch(error){
      response.status(500).json({error:"Internal server error"});  
    }
}

export const generateReport = async(req, res) =>{
    try{
        let query = {};
        const { status, state, bank} =req.query;

        if(status && status !== 'All'){
            query.status = status;
        }
        if(state && state !== 'All'){
            query.location = state;
        }
        if(bank && bank !== 'All'){
            query.bankName = bank;
        }
        const data = await userDataModel.find(query);

       const workbook = new exceljs.Workbook();
       const worksheet = workbook.addWorksheet('data');

       worksheet.columns =[
        {header:"Ticket No.", key:"ticketNumber"},
        {header:"Name", key:"name"},
        {header:"Email Id", key:"email"},
        {header:"Department", key:"department"},
        {header:"Subject", key:"subject"},
        {header:"Location", key:"location"},
        {header:"Bank name", key:"bankName"},
        {header:"Category", key:"category"},
        {header:"Sub category", key:"subCategory"},
        {header:"Status", key:"status"},
    ];

    data.forEach((item)=> {
        worksheet.addRow({ticketNumber:item.ticketNumber, name: item.name, email: item.email,
            department:item.department,subject:item.subject,location:item.location,
            bankName:item.bankName,category:item.category,subCategory:item.subCategory,status:item.status
        });
    });
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');
    
    await workbook.xlsx.write(res);
        res.end();
    }catch(error){
        console.error('Error generating report:', error);
        res.status(500).send('Internal server error');
    }
};

export const pendingTickets =async(req, res)=> {
try{
   const pendingTickets = await userDataModel.find({status: 'Pending'});
   res.status(200).json(pendingTickets);
}catch(error){
  console.error('Error fetching pending tickets:', error);
  res.status(500).json({error: 'Internal server error'});
};
}

export const resolvedTickets =async(req, res)=> {
    try{
       const pendingTickets = await userDataModel.find({status: 'Resolved'});
       res.status(200).json(pendingTickets);
    }catch(error){
      console.error('Error fetching pending tickets:', error);
      res.status(500).json({error: 'Internal server error'});
    };
    }

export const progressTickets =async(req, res)=> {
    try{
       const pendingTickets = await userDataModel.find({status: 'Progress'});
       res.status(200).json(pendingTickets);
    }catch(error){
      console.error('Error fetching pending tickets:', error);
      res.status(500).json({error: 'Internal server error'});
    };
    }
    
 export const chartStatusCount = async(req, res) => {
   try{
      const pendingCount = await userDataModel.countDocuments({ status: 'Pending'});
      const  resolvedCount = await userDataModel.countDocuments({ status: "Resolved" });
      const progressCount = await userDataModel.countDocuments({ status : "Progress" });
      const reopenCount = await userDataModel.countDocuments({ status : "Reopen"});
      const closedCount = await userDataModel.countDocuments({ status:'Closed'});
      res.json({ pendingCount, resolvedCount, progressCount, reopenCount, closedCount});
    }catch(error){
      console.error(error);
      res.status(500).json({ error: "Internal server error"});
    }
 };

 export const reopenTickets =async(req, res)=> {
    try{
       const pendingTickets = await userDataModel.find({status: 'Reopen'});
       res.status(200).json(pendingTickets);
    }catch(error){
      console.error('Error fetching pending tickets:', error);
      res.status(500).json({error: 'Internal server error'});
    };
    }

    export const closedTickets =async(req, res)=> {
        try{
           const pendingTickets = await userDataModel.find({status: 'Closed'});
           res.status(200).json(pendingTickets);
        }catch(error){
          console.error('Error fetching pending tickets:', error);
          res.status(500).json({error: 'Internal server error'});
        };
        }