import express, { request } from 'express';
import { usermodel, userDataModel } from '../model/userSchema.js';


export const usersignup=async(request,response)=>{
    try{
        console.log('request.body',request.body)
        const found = await usermodel.findOne({name:request.body.email});
        if(found){
            console.log('username exist');
            return response.status(401).json('username already exists');
        }
        const user=request.body;
        const newuser=new usermodel(user);
        await newuser.save();
        console.log('user created');
        return response.status(200).json('user created successfully!');
    }catch(error){
        console.log('error.message');
    }
}

export const usersignin=async(request,response)=>{
    try{
        const found = await usermodel.findOne({email:request.body.email, password:request.body.password});
        if(found){
            return response.status(200).json({message:'Login successfully',loginData:found});
        }else{
            console.log('Invalid login attempt');
            return response.status(401).json({error:'Invalid login credientials'});
        }
    }catch(error){
    console.error('Error:',error.message);
    return response.status(500).json({error:'Internal server error'});
}
}

export const postUserData = async(req, res)=>{
    try{
        console.log('req.body',req.body)
        let userData = new  userDataModel(req.body); 
        const {email} = userData;
        const userEmail = await userDataModel.findOne({email});
        const ticketNumber = Math.floor(Math.random() * 1000);
        if(ticketNumber){
            userData["ticketNumber"] = +ticketNumber
        }
        userData["status"] = "Pending"
        if(userEmail){
            console.log('data fetched');
            return res.status(401).json('data already exists');
        }
       const savedUser = await userData.save();
       return res.status(201).json('ticket created successfully');
    }catch(error){
        res.status(500).json({ error: error.message});
        console.log(error);
    }
}

export const updateRecords = async(request,res)=> {
    try{
       const id= request.params.id;
       const userExist = await userDataModel.findOne({_id:id})
       if(!userExist){
        return res.status(404).json({message:'user not found'});
       }
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


