import React from 'react';
//import React, { useState } from "react";
import { Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import Home from './components/Pages/Home';
import CreateTicket from './components/Pages/CreateTicket';
import AllTicket from "./components/Pages/AllTicket";
import Reopen from './components/Pages/Reopen';
import PendingTicket from './components/Pages/PendingTicket';
import PreviewRecords from './components/Pages/PreviewRecords';
import UpdateRecords from './components/Pages/UpdateRecords';


function App() {
  

  return (

    <Routes>

        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Home/>}/>
        <Route path='/createticket' element={<CreateTicket/>} />
        <Route path='/allTicket' element={<AllTicket />} />
        <Route path='/reopen' element={<Reopen />} />
        <Route path='/pendingTicket' element={<PendingTicket/>}/>
        <Route path='/preview' element={<PreviewRecords/>}/>
        <Route path='/updateRecord' element={<UpdateRecords/>}/>

    </Routes>
  );
}

export default App;
