import React, { useState } from 'react'

const SearchFilter = ({...props}) => {
const [searchQuery,setSearchQuery] = useState("")
console.log(props,"ashish")

  const handlesearch = (e) => {
    if(e.target.value.length > 0){
    setSearchQuery(e.target.value);
    }else{
      props.setUsers(props.users2) 
    }
  };
  const handleClick = () =>{
    const filtered = props.users.filter(user=>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      // user.email.toLowerCase().includes(query.toLowerCase())
      );
      props.setUsers(filtered)
  }
  return (
    <>
      <div className='headerMenu1'> 
      <label>Search by:Ticket number/Email/name</label>
          <div className='input-search1'>
            <div className='head-input'>
            <input type='search' placeholder='search here . . .' className='search_1'
             onChange={handlesearch} />
            <button type='button' className='buttonIcon' onClick={handleClick}>
            <i className="bi bi-search" style={{width:"70px"}}></i>
            </button>
            </div>    
          </div>     
</div>
    </>
  )
}

export default SearchFilter;
