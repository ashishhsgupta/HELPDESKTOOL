import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      validationErrors.email = "Enter your email";
    } else if (!email_pattern.test(formData.email)) {
      validationErrors.email = "Enter valid email";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password should be atleast 6 characters long";
    } else if (formData.password.length > 10) {
      validationErrors.password = "Password should not exceed 10 characters";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("/api/v2/signin", formData)
        .then((response) => {
          localStorage.setItem(
            "loginResponseDate",
            JSON.stringify(response.data)
          );
          sessionStorage.setItem("email", formData.email);
          const name = response.data.name;
          sessionStorage.setItem("name", name);

          const userRole = response.data.role;
          sessionStorage.setItem("role", userRole);
          console.log("User Role:", userRole);

          console.log(response);

          if (response.status === 200) {
            alert("Login successfully");
            navigate("/dashboard");
          }
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("user not found");
          }else if (error.response.status === 400){
            alert("Invalid Credentials")
          } else {
            alert("Internal arror");
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="sub_container">
          <div className="tech_img_container">
            <noscript>tech-image</noscript>
          </div>
          <div className="login_container">
            <form className="input_form" onSubmit={handleSubmit}>
              <h4 style={{ marginLeft: "-18px" }}>Login Page</h4>
              <div className="login_field">
                <h5>Login from User/Admin as registered</h5>
                <div className="inputLabel-email ">
                  <div>
                    <label className="labelField1">Email ID:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={inputChange}
                      className="inputlabel"
                      name="email"
                      value={formData.email}
                      placeholder="Enter email id."
                    />
                    <br />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="inputLabel labelPass">
                  <div>
                    <label className="labelField2">Password:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={inputChange}
                      className="inputlabel"
                      autoComplete="true"
                      value={formData.password}
                      name="password"
                      placeholder="Enter correct password."
                    />
                    <br />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                </div>
                <button type="submit" className="inputlabel submit-btn">
                  Submit
                </button>
              </div>
              <div className="bottom-link">
                <div>
                  <Link to="/registration" className="signup">
                    If not registered? click and Sign Up.
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
