//import React from 'react';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import Home from './components/Pages/Home';
import CreateTicket from './components/Pages/CreateTicket';
import AllTicket from "./components/Pages/AllTicket";
import Progress from './components/Pages/Progress';
import PendingTicket from './components/Pages/PendingTicket';
import PreviewRecords from './components/Pages/PreviewRecords';
import UpdateRecords from './components/Pages/UpdateRecords';
import GenerateReport from "./components/Pages/GenerateReport";
import ResolveTicket from "./components/Pages/ResolveTicket";
import Barchart from "./components/Pages/Barchart";




function App() {


  return (
    
<>
    <Routes>

        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Login />} />

        <Route path='/dashboard' element={<Home />}/>
        <Route path='/createticket' element={<CreateTicket/>} />
        <Route path='/allTicket' element={<AllTicket />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/pendingTicket' element={<PendingTicket/>}/>
        <Route path='/preview' element={<PreviewRecords/>}/>
        <Route path='/updateRecord' element={<UpdateRecords/>}/>
        <Route path='generateReport' element={<GenerateReport />} />
        <Route path='resolvedTicket' element={<ResolveTicket/>}/>
        <Route path='barchart' element={<Barchart/>}/>

    </Routes>
    </>
  );
};



export default App;
