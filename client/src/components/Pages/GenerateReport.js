import React from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import './Header.css';


const GenerateReport = () => {
    const handleDownload = async () => {
        try {
          const response = await axios.get('http://localhost:2001/api/report/downloadReport', {
        responseType: 'blob' });

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
    <div id='status-report-list'>
        <label className='report-level'>Report Type</label><br/>
        <select name="type" id="dropdowm-list" >
            <option value="disabled">Category</option>
            <option>All</option>
            <option>Progress</option>
            <option>Pending</option>
            <option>Resolved</option>
        </select>
    </div>
    <div>
        <label className='report-level'>State Wise</label><br/>
        <select name="type" id="dropdowm-list" >
            <option value="disabled">State</option>
            <option>All</option>
            <option>Assam</option>
            <option>Gujarat</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
            <option>Uttar Pradesh</option>
            <option>Madhya Pradesh</option>
        </select>
    </div>
    <div id='bank-report-list'>
        <label className='report-level'>Bank Wise</label><br/>
        <select name="type" id="dropdowm-list" >
            <option value="disabled">Bank Name</option>
            <option>All</option>
            <option>State Bank of India</option>
            <option>Bank of Baroda</option>
            <option>HDFC Bank</option>
            <option>Axis Bank</option>
            <option>ICICI Bank</option>
            <option>Kotak Mahindra Bank</option>
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
