//import React from 'react'
import '../Pages/Header.css';
import Sidebar from './Sidebar';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from './Header';
import { Chart } from "react-google-charts";


export const data = [
  ["Months", "Pending", "Resolved", "Reopen"],
  ["Jan", 2200, 1100, 400],
  ["feb", 350, 900, 250],
  ["March", 1660, 1020, 300],
  ["Apr", 1030, 340, 250],
];
export const options = {
  chart: {
    // title: "Ticket Status",
    // subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};
   
const Home = ()=> {

  const [userCount, setUserCount] = useState('0');
  useEffect(() => {
     axios.get('http://localhost:2001/api/data/count')
      .then(res => {
        setUserCount(res.data.count);
      })
      .catch(error => {
        console.error('Error fetching data count:', error);
      });
  }, []);

  return (
    <>
    <div className=''>
      
    <div className=''> 
     <Header/>
    </div>
     
    </div>
      <div className='flexhomePage'>
      <div>
      <Sidebar />
      </div>
      <div className='homecontainer'>
        <div className='homesub_container'>
          <div className='dashboard-welcome'>
          <h1>Welcome to our Dashboard!</h1>
          <h3>Total Ticket Count. : {userCount}</h3>
          </div>
          <div className='bar-chart'>
          <Chart
      chartType="Bar"
      width="98%"
      height="400px"
      data={data}
      options={options}
    />
      </div>
        </div>
        
      </div>
     </div>
    </>
  )
}

export default Home
