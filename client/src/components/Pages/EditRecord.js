import React, { useState, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import '../Pages/Header.css';
import JoditEditor from "jodit-react";


const EditRecord = () => {

const location = useLocation();
const navigate = useNavigate('');
const role = sessionStorage.getItem('role');
console.log('Role:', role);

const editor = useRef(null);
  const [content, setcontent] = useState("");

  const [currentStatus, setCurrentStatus] = useState(location.state.status);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [userValue, setUserValue] = useState({
    _id: location.state._id,
    name:location.state.name,
    email:location.state.email,
    department:location.state.department,
    subject:location.state.subject,
    location:location.state.location,
    bankName:location.state.bankName,
  });

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value,"ashish12")
    setUserValue ({...userValue,[name]: value});
  }

  const handleSubmit = () => {
  console.log('Role:', role);

  console.log('Current status:', currentStatus);
  console.log('Selected status:', selectedStatus);


  if (
    role === "user" &&
    (selectedStatus === "disabled" || !selectedStatus)
  ) {
    alert("Please select the status");
    return;
  }

  let userId = userValue._id;
  axios.put(`http://localhost:2001/api/v4/updateRecords/${userId}`,  {userValue, status:selectedStatus})
    .then((response) => {
      setCurrentStatus(selectedStatus);
      console.log('Updated current status:', selectedStatus);
      alert("Data updated successfully");
      console.log(response,"data updated")
      navigate('/allTicket')
    })
    .catch((error)=> console.log(error));
  };
  
console.log('Current Status', currentStatus);
    return (
    <>
    <Header/>
    
    <div className='update-records'>
      <div className='edit-records'>
        <Sidebar/>
      </div>
      
      <div className='app-records'>
      <h4>Edit Records</h4><hr/>
      <div className='form_container'>
      <label htmlFor="name">Requester Name:</label><br/>
      <input
              name="name" className='input-value'
              type="text"
              value={userValue.name}
              onChange={handleValueChange} maxLength={20} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' ||  currentStatus === 'Progress' || currentStatus === 'Closed'}
            /><br/><br/>
      <label htmlFor="email">Email:</label><br/>
      <input
              name="email" className='input-value'
              type="text"
              value={userValue.email}
              onChange={handleValueChange} maxLength={100} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' || currentStatus === 'Progress' || currentStatus === 'Closed'}
            /><br/><br/>
      <label htmlFor="email">Department:</label><br/>
      <input
              name="department" className='input-value'
              type="text"
              value={userValue.department}
              onChange={handleValueChange} maxLength={20} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' || currentStatus === 'Progress' || currentStatus === 'Closed'}
            /><br/><br/>
      <label htmlFor="email">Subject:</label><br/>      
      <input
              name="subject" className='input-value'
              type="text"
              value={userValue.subject}
              onChange={handleValueChange} maxLength={20} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' || currentStatus === 'Progress' || currentStatus === 'Closed'}
            /><br/><br/>
      <label htmlFor="email">Location:</label><br/>
      <input
              name="location" className='input-value'
              type="text"
              value={userValue.location}
              onChange={handleValueChange} maxLength={20} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' || currentStatus === 'Progress' || currentStatus === 'Closed'}
            /><br/><br/>
      <label htmlFor="email">Bank:</label><br/>
      <input
              name="bankName" className='input-value'
              type="text"
              value={userValue.bankName}
              onChange={handleValueChange} maxLength={20} 
              readOnly={role ==='admin' || currentStatus === 'Resolved' || currentStatus === 'Progress' || currentStatus === 'Closed'}
            />
</div><br/>
<div>
  <label htmlFor="description"><strong>Description:</strong></label>
  <JoditEditor ref={editor} value={content} onChange={(newContent) => setcontent(newContent)} />
</div><br/>

 {(role === 'admin' || currentStatus === 'Pending' || currentStatus === 'Closed' ||
 currentStatus === 'Reopen' || currentStatus === 'Progress') ? null :( 
 <div className='reopen-list'>
  <label htmlFor='status'>Select status:</label>
  <select value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value);
  console.log('Selected status:', e.target.value);}} required>
  <option value="">Select</option>
  <option value="Reopen">Reopen</option>
  <option value="Closed">Closed</option>
  </select>
  </div>
  )}
  

      <div className='update-btn'>
      <div className='update-btn-btn'><button type='button' onClick={()=>navigate('/allTicket')}>Back</button></div>
     
      {(role === 'user' && (currentStatus === 'Progress' || currentStatus === 'Closed')) || 
      (role === 'admin' && currentStatus === 'Resolved') ? null :(
      <div>
        <button type='button' onClick={handleSubmit} >Update</button>
        </div>
      )}
      </div>
      </div>
      
    
      </div>

      

    </>
  )
}

export default EditRecord
