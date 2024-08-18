//import React from 'react'
import "../Pages/Header.css";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Barchart from "./Barchart";

const Home = () => {
  const [userCount, setUserCount] = useState("0");
  useEffect(() => {
    axios
      .get("/api/data/count")
      .then((res) => {
        setUserCount(res.data.count);
      })
      .catch((error) => {
        console.error("Error fetching data count:", error);
      });
  }, []);

  return (
   
    <>
   
    <div className="home-container">
      <Header/>
      <div className="flexhomePage">
      
        <div className="home-sidebar">
          <Sidebar />
        </div>
        <div className="homecontainer">
          <div className="homesub_container">
            <div className="dashboard-welcome">
              <h2>Welcome to our Dashboard!</h2>
              <h3>Total Ticket Count. : {userCount}</h3>
            </div>
            <div className="bar-chart">
              <Barchart />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
