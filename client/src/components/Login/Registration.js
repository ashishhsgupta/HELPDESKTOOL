import React, { useState } from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...values, role };
    const validationErrors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.name.trim()) {
      validationErrors.username = "Enter username";
    }
    if (!values.email.trim()) {
      validationErrors.email = "Enter your email";
    } else if (!email_pattern.test(values.email)) {
      validationErrors.email = "Enter valid email";
    }
    if (!values.phone.trim()) {
      validationErrors.phone = "Enter your phone number";
    }
    if (!values.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      validationErrors.password =
        "Password should be atleast 6 characters long";
    } else if (values.password.length > 10) {
      validationErrors.password = "Password should not exceed 10 characters";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:2001/api/v1/signup", formData)
        .then((response) => {
          console.log("Registration response:", response);
          if (response.status === 201) {
            alert("Registered successfully");
            navigate("/");
          }
        })
        .catch(function (error) {
          console.log("Registration error:", error.response);
          if (error.response.status === 401) {
            alert("User already exists! for a role");
          } else {
            alert("Already assigned one role");
          }
        });
    }
  };

  return (
    <>
      {/* <div className="super-container"> */}
        <div className="container">
          <div className="sub_container">
            <div className="tech_img_container">
              <noscript>tech-image</noscript>
            </div>
            <div className="login_container">
           
              <form className="input_form" onSubmit={handleSubmit}>
                <h4 style={{marginLeft:'-18px'}}>Registration Page</h4>
                <div className="login_field1">
                  <div className="inputLabel ">
                    <h5>Please select user/admin</h5>
                    <select
                      name="role"
                      defaultValue={"formData.role"}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div>
                      <input
                        type="text"
                        onChange={handleChange}
                        className="inputlabel"
                        name="name"
                        value={values.name}
                        placeholder="Enter Full name."
                      />
                      {errors.username && (
                        <div className="error">{errors.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="inputLabel ">
                    <div>
                      <input
                        type="text"
                        onChange={handleChange}
                        className="inputlabel"
                        name="email"
                        value={values.email}
                        placeholder="Enter Email id."
                      />
                      {errors.email && (
                        <div className="error">{errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="inputLabel ">
                    <div>
                      <input
                        type="text"
                        onChange={handleChange}
                        className="inputlabel"
                        name="phone"
                        placeholder="Enter Phone no."
                      />
                      {errors.phone && (
                        <div className="error">{errors.phone}</div>
                      )}
                    </div>
                  </div>
                  <div className="inputLabel labelPass">
                    <div>
                      <input
                        type="password"
                        onChange={handleChange}
                        className="inputlabel"
                        name="password"
                        placeholder="Enter Password."
                        autoComplete="true"
                      />
                      {errors.password && (
                        <div className="error">{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <button className="inputlabel submit-btn">Submit</button>
                </div>
                <div className="bottom-link">
                    <Link to="/" className="signup">
                      If have an account ? SignIn
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Registration;
