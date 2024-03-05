import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import '../Pages/Header.css';



const Sidebar = () =>{

  return (
   <>
      <div className='sidebar'>
        {/* <Link className='profile'>
          <i className="bi-person-circle me-2" style={{fontSize:'25px'}}></i>
          <span className=''>Profile</span>
        </Link> */}
        <ul className='nav'>
          <li className='active'>
          <Link to="/dashboard" className='linkList'>
            <div className='liList ' >
              <i className='bi bi-speedometer'></i>
              <span className='pageName'>Dashboard</span>
            </div>
          </Link>
          </li>
          <li>
          <Link to="/createTicket" className='linkList'>
            <li className='liList'>
              <i className="bi-telephone-plus me-2"></i>
              <span className='pageName'>Raise a ticket +</span>
            </li>
          </Link>
          </li>
          <li>
          <Link to="/allTicket" className='linkList'>
            <li className='liList'>
              <i className="bi-basket3-fill me-2"></i>
              <span className='pageName'>All Ticket</span>
            </li>
          </Link>
          </li>
          <li>
          <Link to="/reopen" className='linkList'>
            <li className='liList'>
              <i className="bi-person-check me-2"></i>
              <span className='pageName'>Reopen Ticket</span>
            </li>
          </Link>
          </li>
          <li>
          <Link to="/pendingTicket" className='linkList'>
            <li className='liList'>
              <i className="bi-hand-index me-2"></i>
              <span className='pageName'>Pending</span>
            </li>
          </Link>
          </li>
          <li>
          {/* <Link to="/progress" className='linkList'>
            <li className='liList'>
              <i className="bi bi-aspect-ratio me-2"></i>
              <span className='pageName'>WIP</span>
            </li>
          </Link> */}
          </li>
          <li>
          <Link to="/resolved" className='linkList'>
            <li className='liList'>
              <i className="bi-journal-check me-2"></i>
              <span className='pageName'>Resolved</span>
            </li>
          </Link>
          </li>
          <li>
          <Link to="/report" className='linkList'>
            <li className='liList'>
              <i className="bi-table me-2"></i>
              <span className='pageName'>Report</span>
            </li>
          </Link>
          </li>
          <li>
          <Link to="/logout" className='linkList'>
            <li className='liList'>
              <i className="bi-box-arrow-right me-2"></i>
              <span className='pageName'>Logout</span>
            </li>
          </Link>
          </li>
        </ul>
      </div>
      </>
  );
  }

export default Sidebar;
