import React from 'react'
import { Link } from "react-router-dom";
import './Header.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import helpdeskImg from '../Pages/helpdesk_img.png'

const Header = () => {

const userEmail = sessionStorage.getItem('email');
    
  return (
    <>
  
   <div className='header'>
   <div className='dashbordLink'>
    <img src={helpdeskImg} alt="Help Desk"  className='logo-helpdesk'/>
   </div>
   <p>Happy Helpdesk,Grows with Your Bussiness 
      From Start-up To Enterprise, An Efficiant way.
      </p>
   <Link className='header-link'>
          <i className="bi-person-circle me-2" style={{fontSize:'25px'}}></i>
          <span>Welcome</span><br/>
          <span>{userEmail}</span>
      
        </Link>

</div>
      </>
  )
}

export default Header;
