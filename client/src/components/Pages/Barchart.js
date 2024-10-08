//import React from 'react'
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../Login/allTicket.css';
import axios from 'axios';


const Barchart = () => {
  const [ticketCounts, setTicketCounts] = useState({});
  //const [barChartHeight, setBarChartHeight] = useState('');

  useEffect(()=>{
    axios.get('/api/statusCount')
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
    ['Closed', closedCount || 0]
  ];

  const options = {
      title: 'Ticket status'
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
      // chartPackages={['corechart']}
      // chartVersion="51"
    />
      </div>
      <div className='homecontainer2'>
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
