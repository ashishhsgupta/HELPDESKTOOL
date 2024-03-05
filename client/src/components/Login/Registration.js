import React, { useState } from 'react'
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Registration = () => {

const navigate = useNavigate();

const [values, setValues] = useState({
  name:"",
  email: "",
  phone:"",
  password: "",
})
const [errors, setErrors] = useState({})

const handleChange = (e)=>{
  const {name, value} = e.target;
  setValues ({...values,[name]: value})
}
const handleSubmit = async(e)=> {
e.preventDefault ();
const validationErrors = {}
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!values.name.trim()) {
  validationErrors.username= "Enter username"
}
if(!values.email.trim()) {
  validationErrors.email ="Enter your email"
}else if(!email_pattern.test(values.email)){
  validationErrors.email="Enter valid email"
}
if(!values.phone.trim()){
  validationErrors.phone ="Enter your phone number"
}
if(!values.password.trim()){
  validationErrors.password="Password is required"
}else if(values.password.length < 6){
  validationErrors.password="Password should be atleast 6 characters long"
}else if (values.password.length > 10){
  validationErrors.password="Password should not exceed 10 characters"
}

setErrors(validationErrors)
if(Object.keys(validationErrors).length === 0) {
  alert('Registration successfully')
  axios.post("http://localhost:2001/api/v1/signup", values)
    .then((response) => {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
 navigate('/')
  }
}

  return (
    <>
    <div>
      <div className="container">
        <div className="sub_container">
          <div className="tech_img_container">
            <noscript>tech-image</noscript>
          </div>
          <div className="login_container">
            <form className="input_form" onSubmit={handleSubmit}>
            <h2>Registration Page</h2>
              <div className="login_field1">
              <div className="inputLabel ">
          
              <div><input type="text" onChange={handleChange} className="inputlabel" name="name"
              value={values.name} placeholder="Enter Full name." />
              <br/>{errors.username && (<span className='error'>{errors.username}</span>)}
              </div>
             
              </div>
              <div className="inputLabel ">
        
              <div><input type="text" onChange={handleChange} className="inputlabel" name="email" 
                value={values.email} placeholder="Enter Email id." />
              <br/>{errors.email && (<span className='error'>{errors.email}</span>)}
              </div>
             
              </div>
              <div className="inputLabel ">
          
              <div><input type="text" onChange={handleChange} className="inputlabel" name="phone" placeholder="Enter Phone no." />
              <br/>{errors.phone && (<span className='error'>{errors.phone}</span>)}
              </div>
              
              </div>
              <div className="inputLabel labelPass">

              <div><input type="password" onChange={handleChange} className="inputlabel" name="password" 
               placeholder="Enter Password."  autoComplete='true' />
              <br/>{errors.password && (<span className='error'>{errors.password}</span>)}
              </div>
              
              </div>
          <button className="inputlabel submit-btn">Submit</button>
              </div>
              <div className="bottom-link">
              <div><Link to='/' className="signup">If have an account ? SignIn</Link></div>
              </div>  
            </form>
           
          </div>
        </div>
      </div>
    
    </div>
    </>
  )
}

export default Registration
