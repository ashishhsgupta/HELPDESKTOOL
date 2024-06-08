import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../Pages/Header.css';


const PreviewRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  return (
  <>
   <Header/>
    <div className='preview_records'>
    <div className='edit-records'>
      <Sidebar/>
    </div>
    <div className='app-details'>
      <h4><strong>View Application Details:</strong></h4>
      <div className='form-data'>
    <p><span className='prev-title'>Ticket number:</span><span className='prev-data'>{location.state.ticketNumber}</span></p><hr/>
    <p><span className='prev-title'>Name:</span><span className='prev-data'>{location.state.name}</span></p><hr/>
    <p><span className='prev-title'>Email:</span><span className='prev-data'>{location.state.email}</span></p><hr/>
    <p><span className='prev-title'>Department:</span><span className='prev-data'>{location.state.department}</span></p><hr/>
    <p><span className='prev-title'>Subject:</span><span className='prev-data'>{location.state.subject}</span></p><hr/>
    <p><span className='prev-title'>Location:</span><span className='prev-data'>{location.state.location}</span></p><hr/>
    <p><span className='prev-title'>Bank:</span><span className='prev-data'>{location.state.bankName}</span></p><hr/>
    <p><span className='prev-title'>Category:</span><span className='prev-data'>{location.state.category}</span></p><hr/>
    <p><span className='prev-title'>Assign-To:</span><span className='prev-data'>{location.state.subCategory}</span></p><hr/>
    <p><span className='prev-title'>Status:</span><span className='prev-data'>{location.state.status}</span></p><hr/>
    <p><span className='prev-title'>Description:</span><span className='prev-data'>{location.state.description}</span></p>
    </div>
    <div className="back-btn">
    <button onClick={()=>navigate('/allTicket')}>Back</button>
   
    </div>
    </div>
   </div>
   
 
    </>
  );
};

export default PreviewRecords;
