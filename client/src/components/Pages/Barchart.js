//import React from 'react'
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../Login/allTicket.css';
import axios from 'axios';


const Barchart = () => {
  const [ticketCounts, setTicketCounts] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:2001/api/statusCount')
    .then(response => {
       setTicketCounts(response.data);
    }).catch(error => {
      console.error('Error fetching status counts:', error);
    });
  }, []);

  const { pendingCount, resolvedCount, progressCount, reopenCount, closedCount} = ticketCounts;
  
  const data = [
    ["Status", ''],
    ['Pending', pendingCount || 0],
    ['Resolved', resolvedCount || 0],
    ['Progress', progressCount || 0],
    ['Reopen', reopenCount || 0],
    ['Closed', closedCount || 0],
  ];
console.log('reopen:', reopenCount)
console.log('closed:', closedCount)

  const options = {
    chart: {
      title: 'Ticket status'
    },
  };
    
  return (
    <div className='charts-status'>
      <div className='homecontainer1'>
          <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
      </div>
      <div>
      <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
      </div>
        </div>
        
    
  )
}

export default Barchart
