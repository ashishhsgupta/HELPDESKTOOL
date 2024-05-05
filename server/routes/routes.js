import express from "express";
import { usersignup, usersignin, ticketCount, postUserData, updateRecords, deleteRecord, generateReport,
        pendingTickets, resolvedTickets, reopenTickets, closedTickets, progressTickets, chartStatusCount} from "../userController/userController.js";
import { userDataModel } from "../model/userSchema.js";

const router = express();

router.post('/api/v1/signup', usersignup);
router.post('/api/v2/signin', usersignin);
router.post('/api/v3/postData',  postUserData);
router.put('/api/v4/updateRecords/:id', updateRecords);
router.delete('/api/v5/removeRecord/:id', deleteRecord);
router.get('/api/data/count', ticketCount);
router.get('/api/report/downloadReport', generateReport);
router.get('/api/ticket/pendingTicket', pendingTickets);
router.get('/api/ticket/resolvedTicket', resolvedTickets);
router.get('/api/ticket/reopenTicket', reopenTickets);
router.get('/api/ticket/closedTicket', closedTickets);
router.get('/api/ticket/progressTicket', progressTickets);
router.get('/api/statusCount', chartStatusCount);

router.get('/api/getUserdata', async (req, res)=> {
    try{
        const data = await userDataModel.find();
        res.status(200).json(data);
    }catch (error) {
        console.error('error fetching data:' , error);
        res.status(500).json({ message:'Internal server error'});
    }
});
  


export default router;