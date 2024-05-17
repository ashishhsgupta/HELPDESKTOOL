import React, { useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../Pages/Header.css';



const Sidebar = () =>{
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/');
  };
 
  const handleClick =(link)=>{
    if(activeLink!== link){
    setActiveLink(link);
    }
  }
  return (
   <>
      <div className='sidebar'>
        <Link className='profile'>
        <div className='liList-role' >
        <i className="bi-people" style={{fontSize:'30px'}}></i>
          <span className='' style={{marginLeft:'15px'}}> Role : {role}</span>
          </div>
        </Link>
        <ul className='nav'>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard" className='linkList'>
            <div className='liList ' >
              <i className='bi bi-speedometer' style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'15px'}}>Dashboard</span>
            </div>
          </Link>
          </li>
          {role === 'user' && (
          <li>
          <Link to="/createTicket" 
          onClick={()=> handleClick('Raise a ticket')} className={activeLink === 'Raise a ticket' ? 'active': ''}>
            <div className='liList liList-add'>
              <i className="bi-telephone-plus me-2" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'8px'}}>Add Ticket</span>
            </div>
          </Link>
          </li>
          )} 
        
          <li>
          <Link to="/allTicket"
          onClick={()=> handleClick('All Ticket')} className={activeLink === 'All Ticket' ? 'active' :''}>
            <div className='liList'>
            <i className="bi-archive" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'17px'}}>All Ticket</span>
            </div>
          </Link>
          </li>
      
          <li>
          <Link to="/pendingTicket" 
          onClick={()=> handleClick('Pending')} className={activeLink === 'Pending' ? 'active' : ''}>
            <div className='liList'>
            <i className="bi-arrows-move" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'15px'}}>Pending</span>
            </div>
          </Link>
          </li>
          
          <li>
          <Link to="/progress" 
          onClick={()=>handleClick('progress')} className={activeLink === 'progress' ? 'active' : ''}>
            <div className='liList'>
            <i className="bi-arrow-right-circle" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'15px'}}>Progress</span>
            </div>
          </Link>
          </li>

          <li>
          <Link to="/resolvedTicket" 
          onClick={()=> handleClick('Resolved')} className={activeLink === 'Resolved' ? 'active' : ''}>
            <div className='liList liList-add'>
              <i className="bi-journal-check me-2" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'8px'}}>Resolved</span>
            </div>
          </Link>
          </li>
          <li>
          <Link to="/reopenTicket" 
          onClick={()=> handleClick('Reopen')} className={activeLink === 'Reopen' ? 'active' : ''}>
            <div className='liList'>
            <i className="bi bi-arrow-repeat" style={{fontSize:'30px'}} ></i>
            
              <span className='pageName' style={{marginLeft:'15px'}}>Reopen</span>
            </div>
          </Link>
          </li>
          <li>
          <Link to="/closedTicket" 
          onClick={()=> handleClick('Closed')} className={activeLink === 'Closed' ? 'active' : ''}>
            <div className='liList'>
            <i className="bi bi-backspace-reverse" style={{fontSize:'30px'}}></i>
              <span className='pageName' style={{marginLeft:'15px'}}>Closed</span>
            </div>
          </Link>
          </li>
          <li>
          <Link to="/generateReport"
          onClick={()=> handleClick('Report')} className={activeLink === 'Report' ? 'active' : ''}>
            <div className='liList'>
              <i className="bi-download" style={{fontSize:'30px'}}></i>
              <span className='pageName'style={{marginLeft:'15px'}}>Report</span>
            </div>
          </Link>
          </li>
          <li>
            <div className='liList liList-add'>
              <i className="bi-box-arrow-right me-2" style={{fontSize:'30px'}}></i>
              <button onClick={handleLogout} className='pageName' style={{marginLeft:'8px'}}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
      </>
  );
  }

export default Sidebar;
