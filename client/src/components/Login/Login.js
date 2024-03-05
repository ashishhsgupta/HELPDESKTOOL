import React,  { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({});

  const inputChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData,[name]: value})
  }

  // const savedata= async()=>{
  //   console.log("user dat is--", formData);
  //   console.log("savedata");
  // }

 const handleSubmit =async(e)=>{
  e.preventDefault();
  const validationErrors= {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!formData.email.trim()){
    validationErrors.email ="Enter your email"
  }else if(!email_pattern.test(formData.email)){
    validationErrors.email="Enter valid email"
  }
  if(!formData.password.trim()){
    validationErrors.password="Password is required"
  }else if(formData.password.length < 6){
    validationErrors.password="Password should be atleast 6 characters long"
  }else if (formData.password.length > 10){
    validationErrors.password="Password should not exceed 10 characters"
  }

  setErrors(validationErrors)
  if(Object.keys(validationErrors).length===0){
     try {
      const res = await axios.post(`http://localhost:2001/api/v2/signin`,formData );
      console.log(res.data, 'resdata');
      localStorage.setItem("loginResponseDate",JSON.stringify(res.data));
    }catch (error) {
      console.error("Error saving data:", error);
    }
    alert("Login Successfully");
    navigate("/dashboard");
  }
 }
  return (
    <>
      <div className="container">
        <div className="sub_container">
          <div className="tech_img_container">
            <noscript>tech-image</noscript>
          </div>
          <div className="login_container">
            <form className="input_form" onSubmit={handleSubmit}>
            <h2>Login Page</h2>
              <div className="login_field">
              <div className="inputLabel ">
              <div ><label className="labelField1">Username/Email:</label></div>
              <div><input type="text" onChange={inputChange} className="inputlabel" name="email"
              value={formData.email} placeholder="Enter email id." />
              <br/>{errors.email && (<span className="error">{errors.email}</span>)}
              </div>
              </div>
              <div className="inputLabel labelPass">
              <div><label className="labelField2">Password:</label></div>
              <div><input type="password" onChange={inputChange} className="inputlabel" autoComplete="true"
              value={formData.password} name="password"  placeholder="Enter Username/Email id." />
              <br/>{errors.password && (<span className="error">{errors.password}</span>)}
              </div>
              </div>
              <button className="inputlabel submit-btn">Submit</button>
              </div>
              <div className="bottom-link">
              <div><Link className="forgotPass" style={{color:"blueviolet"}}>Forgot/Reset Password</Link></div>
              <div><Link to='/registration' className="signup">If don't have an account ? Create account</Link></div>
              </div>  
            </form>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;