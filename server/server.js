import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config";
import dotenv from "dotenv" 
import { connectDatabase } from "./config/database.js";
import routers from "./routes/routes.js";

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

app.use('/',routers);

app.listen(process.env.PORT,()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});






// mongoose.connect('mongodb://localhost:27017/ticketDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const ticketSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     subject: String,
//   });
  
//   const Ticket = mongoose.model('Ticket', ticketSchema);
  
//   app.post('/api/generate-ticket', async (req, res) => {
//     const { name, email, subject } = req.body;
  
//     if (!name || !email || !subject) {
//       return res.status(400).json({ error: 'All fields are mandatory.' });
//     }
  
//     const newTicket = new Ticket({
//       name,
//       email,
//       subject,
//     });
  
//     try {
//       await newTicket.save();
//       const ticketNumber = newTicket._id; // Use the ticket's MongoDB ID as the ticket number
//       res.status(200).json({ message: 'Ticket generated successfully', ticketNumber });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error generating ticket' });
//     }
//   });
  
//   app.get('/api/get-all-tickets', async (req, res) => {
//     try {
//       const allTickets = await Ticket.find();
//       res.status(200).json(allTickets);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error fetching ticket data' });
//     }
//   });
