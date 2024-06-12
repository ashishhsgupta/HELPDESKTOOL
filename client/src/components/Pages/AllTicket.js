import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Login/allTicket.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link, useNavigate } from "react-router-dom";
import SearchFilter from './SearchFilter';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



const AllTicket = ({data}) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
 console.log('role:',role);

  const [filteredData, setFilteredData] = useState(data);
   useEffect(()=>{
    setFilteredData(data);
   },[data]);

   console.log(filteredData);
   
   const handleSearch =(query)=>{
     const filtered = users.filter(user=>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      );
      setFilteredData(filtered);
   };

  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [userCount, setUserCount] = useState(0);

      useEffect(()=> {
        axios.get('http://localhost:2001/api/getUserdata')
        .then(response =>{
          setUsers(response.data);
          setUsers2(response.data)
          setUserCount(response.data.length);
        })
        .catch(error => {
          console.error('Error fetching data', error);
      });
     }, [])

     const [currentPage, setCurrentPage] = useState(1);
     const recordsPerPage = 10;
     const lastIndex = currentPage * recordsPerPage;
     const firstIndex = lastIndex - recordsPerPage;
     const records = users.slice(firstIndex, lastIndex);
     const npage = Math.ceil(users.length / recordsPerPage);
     const numbers = [...Array(npage + 1).keys()].slice(1);
  
const handlePreview = (prewData) =>{
  navigate('/preview',{state:prewData});
}
const handleUpdate = (updateData) =>{
  console.log("current status:", updateData.status)
  navigate('/updateRecord',{state:updateData});
}
const handleEdit = (editData) => {
  console.log("current status:", editData.status)
  navigate('/editRecord', {state:editData});
}

  const [show, setShow] = useState({});
  const [modalValue, setModalValue] = useState({});
  const [viewUserIndex, setViewUserIndex] = useState();
  const handleClose = () => setShow({});

const deleteData = (userItem,index)=>{
 setShow({showModaldeletion: true, items: userItem});
 setModalValue(userItem);
 setViewUserIndex(index);
 console.log(index,"index")
}

const handleModelDelete = (modelValue) =>{
  let itemToBeDeleted = modelValue._id;
  console.log(modelValue._id, "userItem");
  axios.delete(`http://localhost:2001/api/v5/removeRecord/${itemToBeDeleted}`)
  .then((users)=> {
    console.log(users, "--ashhhh");
    alert("Successfully deleted the record!");
    window.location.reload();
  }).catch((err)=> console.log(err));
  console.log(users, "data delete")
  }

  return (
    <>
    <Header/>
    <div className='allTicket-header'>
    <div className='allTicket-flex'>
    <div className='allTicket-sidebar'>
    <Sidebar />
    </div>
    <div className='table-head'>
      <div className='search-box'>
      <div><h5>Total Ticket Counts : {userCount}</h5></div>
      <SearchFilter users={users} setUsers={setUsers} users2={users2} handleSearch={handleSearch}/>
      </div>
      <div className='allTicket-table'>
        <table className='customers'>
          <thead className='thead-data'>
            <tr className='row-data'>
              <th scope="col">Sr. no.</th>
              <th scope="col">Ticket no.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Subject</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan={3} className="colspan-action" style={{textAlign:'center'}}>Action</th>      
            </tr>
          </thead>
          {role === 'user' ? (
            <tbody>
              {
                records.map((user, index)=>(
                  <tr key={user._id}>
                 <td className='sr-no'>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                 <td>{user.ticketNumber}</td>
                 <td>{user.name}</td>
                 <td>{user.email}</td>
                 <td>{user.subject}</td>
                 <td>{user.status}</td>
                 <td className='td-action2' onClick={()=> handleEdit(user)}>Edit</td>
                 <td className='td-action1' onClick={()=> handlePreview(user)}>Preview</td>
                  </tr>
                ))
              }
            </tbody>
          ):(
          <tbody>
            {
             records.map((user, index ) => (
              <tr key={user._id}>
                <td className='sr-no'>{index+1+(currentPage-1)*recordsPerPage}</td>
                <td>{user.ticketNumber}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.subject}</td>
                <td>{user.status}</td>
                <td className='td-action1'onClick={() =>handlePreview(user)}>Preview</td>     
               <td className='td-action2' onClick={()=>handleUpdate(user)}>Update</td>
               <td className='td-action3' onClick={()=>deleteData(user,index+1+ (currentPage - 1) * recordsPerPage)}>Delete</td>    
              </tr>
            ))}   
          </tbody>
  )}
        </table>
        </div>
    <div className="nav-page">
          <div className="back-btn">
          </div>
          <div className="nav-list">
            <nav className="">
              <ul className="pagination">
                <li className="page-item">
                  <Link to="#" className="page-link prev-btn" onClick={prePage}>
                    Prev
                  </Link>
                </li>
                {numbers.map((n, i) => (
                  <li id='page-active-item'
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </Link>
                  </li>
                ))}
                <li className="page-item">
                  <Link to="#" className="page-link next-btn" onClick={nextPage}>
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        </div>
        </div>
    </div>


    <Modal
          className="model-content"
          show={show.showModaldeletion}
          onHide={handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton style={{background:'#E59866', color:'#FDFEFE'}}>
            <Modal.Title>Click on confirm botton if want to delete this request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
          <Table variant="" size="sm"  className='customers' style={{marginRight:"30px"}}>
      <thead className='thead-data'>
        <tr>
          <th>Sr. no</th>
          <th>Name:</th>
          <th>Email:</th>
          <th>Subject:</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <td>{viewUserIndex}<strong>.</strong></td>
        <td>{modalValue.name }</td>
        <td>{modalValue.email }</td>
        <td>{modalValue.subject }</td>
        <td>{modalValue.status }</td>
      </tbody>
    </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button variant="primary" onClick={()=>handleModelDelete(modalValue)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>


    </>
  );
  function prePage(){
    if(currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id){
    setCurrentPage(id);
  }
  function nextPage(){
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1);
    }
  }
}

export default AllTicket;

