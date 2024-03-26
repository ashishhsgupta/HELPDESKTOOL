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
    navigate('/login');
  };
 
  const handleClick =(link)=>{
    if(activeLink !== link){
    setActiveLink(link);
    }
  }
  return (
   <>
      <div className='sidebar'>
        {/* <Link className='profile'>
          <i className="bi-person-circle me-2" style={{fontSize:'25px'}}></i>
          <span className=''>Profile</span>
        </Link> */}
         <p>Role: {role}</p>
        <ul className='nav'>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard" className='linkList'>
            <div className='liList ' >
              <i className='bi bi-speedometer'></i>
              <span className='pageName'>Dashboard</span>
            </div>
          </Link>
          </li>
          {role === 'user' && (
          <li>
          <Link to="/createTicket" 
          onClick={()=> handleClick('Raise a ticket')} className={activeLink === 'Raise a ticket' ? 'active': ''}>
            <div className='liList'>
              <i className="bi-telephone-plus me-2"></i>
              <span className='pageName'>Raise a ticket +</span>
            </div>
          </Link>
          </li>
          )} 
          <li>
          <Link to="/allTicket"
          onClick={()=> handleClick('All Ticket')} className={activeLink === 'All Ticket' ? 'active' :''}>
            <div className='liList'>
              <i className="bi-basket3-fill me-2"></i>
              <span className='pageName'>All Ticket</span>
            </div>
          </Link>
          </li>
      
          <li>
          <Link to="/progress" 
          onClick={()=>handleClick('progress')} className={activeLink === 'progress' ? 'active' : ''}>
            <div className='liList'>
              <i className="bi-person-check me-2"></i>
              <span className='pageName'>Progress</span>
            </div>
          </Link>
          </li>
          
          <li>
          <Link to="/pendingTicket" 
          onClick={()=> handleClick('Pending')} className={activeLink === 'Pending' ? 'active' : ''}>
            <div className='liList'>
              <i className="bi-hand-index me-2"></i>
              <span className='pageName'>Pending</span>
            </div>
          </Link>
          </li>
          <li>
          {/* <Link to="/progress" className='linkList'>
            <div className='liList'>
              <i className="bi bi-aspect-ratio me-2"></i>
              <span className='pageName'>WIP</span>
            </div>
          </Link> */}
          </li>
          <li>
          <Link to="/resolvedTicket" 
          onClick={()=> handleClick('Resolved')} className={activeLink === 'Resolved' ? 'active' : ''}>
            <div className='liList'>
              <i className="bi-journal-check me-2"></i>
              <span className='pageName'>Resolved</span>
            </div>
          </Link>
          </li>
          <li>
          <Link to="/generateReport"
          onClick={()=> handleClick('Report')} className={activeLink === 'Report' ? 'active' : ''}>
            <div className='liList'>
              <i className="bi-table me-2"></i>
              <span className='pageName'>Report</span>
            </div>
          </Link>
          </li>
          <li>
          <Link className='linkList'>
            <div className='liList'>
              <i className="bi-box-arrow-right me-2"></i>
              {/* <span className='pageName'>Logout</span> */}
              <button onClick={handleLogout} className='pageName'>Logout</button>
            </div>
          </Link>
          </li>
        </ul>
      </div>
      </>
  );
  }

export default Sidebar;
