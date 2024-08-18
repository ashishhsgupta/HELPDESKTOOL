import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import './Header.css';


const GenerateReport = () => {
  const [selectedStatus, setSelecetdStatus] = useState('');
  const [selectedState, setSelecetdState] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

    const handleDownload = async () => {
      if(!selectedStatus || selectedStatus === 'disabled' || !selectedState || selectedState === 'disabled' || !selectedBank || selectedBank === 'disabled'){
        alert('Please select an option for all dropdown!');
        return;
      }
        try {
          const response = await axios.get('/api/report/downloadReport', {
        responseType: 'blob',
        params:{
        status: selectedStatus !== "All" ? selectedStatus : undefined,
        state: selectedState !== "All" ? selectedState : undefined,
        bank: selectedBank !== "All" ? selectedBank : undefined
      }
     });

          console.log('ashish:',response );
          const blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'data.xlsx');
          document.body.appendChild(link);
          link.click();
          
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading report:', error);
        }
      };

  return (
    <>
    <Header />
    <div className='container-report'>
    <div className='sidebar-report'>
    <Sidebar />
    </div>
    <div className='container-report-btn'>
    <h4>My Reports</h4>
    <div className='report-selection'>
    <div id='status-report-list' className='status-report-list'>
        <label className='report-level'>Report Type</label><br/>
        <select name="type" id="dropdowm-list" value={selectedStatus} onChange={(e)=> setSelecetdStatus(e.target.value)}>
            <option value="" disabled style={{color:"red"}}>Select Status</option>
            <option>All</option>
            <option>Pending</option>
            <option>Progress</option>
            <option>Resolved</option>
            <option>Reopen</option>
            <option>Closed</option>
        </select>
    </div>
    <div className='state-report-list'>
        <label className='report-level'>State Wise</label><br/>
        <select name="type" id="dropdowm-list" value={selectedState} onChange={(e)=> setSelecetdState(e.target.value)}>
            <option value="disabled" style={{color:"red"}}>Select State</option>
            <option>All</option>
            <option>Delhi</option>
            <option>Uttar Pradesh</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
        </select>
    </div>
    <div id='bank-report-list' className='status-report-list'>
        <label className='report-level'>Bank Wise</label><br/>
        <select name="type" id="dropdowm-list" value={selectedBank} onChange={(e)=> setSelectedBank(e.target.value)} >
            <option value="disabled" style={{color:"red"}}>Select Bank</option>
            <option>All</option>
            <option>Bank of Baroda</option>
            <option>HDFC Bank</option>
            <option>Axis Bank</option>
        </select>
    </div>
    </div><br/>
    <div className='report-download-btn'>
      <button onClick={handleDownload}>Download Report</button>
    </div><br/>
    <div className='report-alert'>
      <p>Note:Reports may take time to sync with the entered data. Please be patient while the download completes.</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default GenerateReport
