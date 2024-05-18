import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import "../Pages/Header.css";
import JoditEditor from "jodit-react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected image");
  const editor = useRef(null);
  const [content, setcontent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    location: "",
    bankName: "",
    category: "",
    subCategory: "",
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
    if (!formData.name.trim()) {
      validationErrors.name = "**";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "**";
    } else if (!email_pattern.test(formData.email)) {
      validationErrors.email = "*Please enter a valid Email address!";
    }
    if (!formData.department.trim()) {
      validationErrors.department = "**";
    }
    if (!formData.subject.trim()) {
      validationErrors.subject = "**";
    }
    if (!formData.location.trim()) {
      validationErrors.location = "**";
    }
    if (!formData.bankName.trim()) {
      validationErrors.bankName = "**";
    }
    if (!formData.category.trim()) {
      validationErrors.category = "**";
    }
    if (!formData.subCategory.trim()) {
      validationErrors.subCategory = "**";
    }

    if (
      formData.location === "formData.location" ||
      formData.bankName === "formData.bankName" ||
      formData.category === "formData.category" ||
      formData.subCategory === "formData.subCategory"
    ) {
      validationErrors.selectDropdowns =
        "Please select an option for all dropdown";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:2001/api/v3/postData",
          formData
        );
        const data = res.data;
        console.log("---ticket:", data);
        alert(`ticket created successfully ticket no.: ${data.ticketNumber}`);
        navigate("/allTicket");
        console.log(res.data);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      const confirmation = window.confirm(
        "Please fill out all required fields!"
      );
      if (!confirmation) {
        setErrors({});
      }
    }
  };

  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="ticket-container">
        <div className="ticket-sidebar">
          <Sidebar />
        </div>
        <div className="ticket-page">
          <div className="page-container">
            <div className="page-subContainer">
              Raise a request
              <hr />
            </div>
          </div>
          <div className="subPage-container">
            <div className="ticketField">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Requester Name:</label>
                {errors.name && (
                  <span className="inputError">{errors.name}</span>
                )}{" "}
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={inputChange}
                  className="title"
                  placeholder="Enter your name"
                  value={formData.name}
                />
                <br />
                <br />
                <label htmlFor="email">Requester Email:</label>
                {errors.email && (
                  <span className="inputError">{errors.email}</span>
                )}{" "}
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={inputChange}
                  className="title"
                  placeholder="Enter your email"
                  value={formData.email}
                />
                <br />
                <br />
                <label htmlFor="department">Department:</label>
                {errors.department && (
                  <span className="inputError">{errors.department}</span>
                )}
                <br />
                <input
                  type="text"
                  name="department"
                  id="department"
                  onChange={inputChange}
                  className="title"
                  placeholder="Department name"
                  value={formData.department}
                />
                <br />
                <br />
                <label htmlFor="subject">Subject:</label>
                {errors.subject && (
                  <span className="inputError">{errors.subject}</span>
                )}
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  onChange={inputChange}
                  className="title"
                  placeholder="Write here subject"
                  value={formData.subject}
                />
                <br />
                <br />
                <div className="ticket-description">
                  <label htmlFor="description">Description:</label>
                  <br />
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setcontent(newContent)}
                  />
                </div>
                <br />
                <label htmlFor="category">Location:</label>
                {errors.location && (
                  <span className="inputError">{errors.location}</span>
                )}
                <select
                  defaultValue={"formData.location"}
                  id="bankName"
                  className="custom-select"
                  onChange={inputChange}
                  name="location"
                  required
                >
                  <option disabled className="title" value="formData.location">
                    Choose the location...
                  </option>
                  <option>Delhi</option>
                  <option>Uttar pradesh</option>
                  <option>Madhya pradesh</option>
                  <option>Maharashtra</option>
                  <option>Rajashthan</option>
                </select>
                <br />
                <br />

                <label htmlFor="category">Bank Name:</label>
                {errors.bankName && (
                  <span className="inputError">{errors.bankName}</span>
                )}
                <select
                  defaultValue={"formData.bankName"}
                  id="bankName"
                  className="custom-select"
                  onChange={inputChange}
                  name="bankName"
                >
                  <option disabled className="title" value="formData.bankName">
                    Choose the bank name...
                  </option>
                  <option>Bank of Baroda</option>
                  <option>HDFC Bank</option>
                  <option>Axis Bank</option>
                </select>
                <br />
                <br />
                <label htmlFor="category">Catogory:</label>
                {errors.category && (
                  <span className="inputError">{errors.category}</span>
                )}
                <select
                  defaultValue={"formData.category"}
                  id="category"
                  className="custom-select"
                  onChange={inputChange}
                  name="category"
                >
                  <option disabled className="title" value="formData.category">
                    Choose an option...
                  </option>
                  <option>Low</option>
                  <option>Midium</option>
                  <option>High</option>
                </select>
                <br />
                <br />
                <label htmlFor="subCategory">Assign To:</label>
                {errors.category && (
                  <span className="inputError">{errors.subCategory}</span>
                )}
                <select
                  defaultValue={"formData.subCategory"}
                  id="subCategory"
                  className="custom-select"
                  onChange={inputChange}
                  name="subCategory"
                >
                  <option
                    disabled
                    className="title"
                    value="formData.subCategory"
                  >
                    Choose an option...
                  </option>
                  <option>Helpdesk L1</option>
                  <option>Helpdesk L2</option>
                  <option>Helpdesk L3</option>
                </select>
                <br />
                <br />
                <label htmlFor="attachment">Attachment</label>
                <div
                  className="attachment"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    name="attachment"
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {image ? (
                    <img src={image} width={100} height={100} alt={fileName} />
                  ) : (
                    <div className="cloudImage">
                      <MdCloudUpload color="#1475cf" size={50} />
                      <p>Browse image to upload</p>
                    </div>
                  )}
                </div>
                <section className="uploaded-raw">
                  <AiFillFileImage color="#1475cf" />
                  <span className="upload-content">
                    {fileName}
                    <MdDelete
                      onClick={() => {
                        setFileName("No selected File");
                        setImage(null);
                      }}
                    />
                  </span>
                </section>
                <div className="saveSubmit">
                  <div className="save"></div>
                  <div className="submit">
                    <button type="submit">Submit</button>
                  </div>
                </div>
                <p className="email">Email: ashishhsgupta11@gmail.com</p>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
