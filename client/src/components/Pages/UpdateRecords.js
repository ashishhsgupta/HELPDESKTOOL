import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import '../Pages/Header.css';


const UpdateRecords = () => {
  const location = useLocation();
const navigate = useNavigate('');

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
    let userId = userValue._id;
    axios.put(`http://localhost:2001/api/v4/updateRecords/${userId}`, userValue)
    .then((users)=>{
      alert("Data updated successfully");
      console.log(users,"data updated")
      navigate('/allTicket')
    })
    .catch((error)=> console.log(error));
  };
 
    return (
    <>
    <Header/>
    <div className='update-records'>
      <div><Sidebar/></div>
      <div className='app-records'>
      <h2>Update Records</h2><hr/>
      <div className='form_container'>
      <label htmlFor="name">Requester Name:</label><br/>
      <input
              name="name" className='input-value'
              type="text"
              value={userValue.name}
              onChange={handleValueChange} maxLength={20} 
            /><br/><br/>
      <label htmlFor="email">Email:</label><br/>
      <input
              name="email" className='input-value'
              type="text"
              value={userValue.email}
              onChange={handleValueChange} maxLength={100} 
            /><br/><br/>
      <label htmlFor="email">Department:</label><br/>
      <input
              name="department" className='input-value'
              type="text"
              value={userValue.department}
              onChange={handleValueChange} maxLength={20} 
            /><br/><br/>
      <label htmlFor="email">Subject:</label><br/>      
      <input
              name="subject" className='input-value'
              type="text"
              value={userValue.subject}
              onChange={handleValueChange} maxLength={20} 
            /><br/><br/>
      <label htmlFor="email">Location:</label><br/>
      <input
              name="location" className='input-value'
              type="text"
              value={userValue.location}
              onChange={handleValueChange} maxLength={20} 
            /><br/><br/>
      <label htmlFor="email">Bank:</label><br/>
      <input
              name="bankName" className='input-value'
              type="text"
              value={userValue.bankName}
              onChange={handleValueChange} maxLength={20} 
            /><br/>
</div>
      <div className='update-btn'>
      <div className='update-btn-btn'><button type='button' onClick={()=>navigate('/allTicket')}>Close</button></div>
      <div>
        <button type='button' onClick={handleSubmit}>Update</button></div>
      </div>
      </div>
      </div>

      

    </>
  )
}

export default UpdateRecords
