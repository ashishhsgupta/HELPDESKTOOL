import express from "express";
import { usersignup, usersignin, postUserData, updateRecords, deleteRecord } from "../userController/userController.js";
import { userDataModel } from "../model/userSchema.js";

const router = express();

router.post('/api/v1/signup', usersignup);
router.post('/api/v2/signin', usersignin);
router.post('/api/v3/postData',  postUserData);
router.put('/api/v4/updateRecords/:id', updateRecords);
router.delete('/api/v5/removeRecord/:id', deleteRecord);



router.get('/api/getUserdata', async (req, res)=> {
    try{
        const data = await userDataModel.find();
        res.status(200).json(data);
    }catch (error) {
        console.error('error fetching data:' , error);
        res.status(500).json({ message:'Internal server error'});
    }
});

router.post('/generateTicket', async (req, res) => {
    const ticketNumber = Math.floor(Math.random() * 1000);
     res.json({ ticketNumber });  
});

router.get('/api/data/count', async (req, res) => {
    try {
      const count = await userDataModel.countDocuments();
      res.json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  


export default router;