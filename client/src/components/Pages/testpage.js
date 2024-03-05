// src/TicketPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !subject) {
      setErrorMessage('All fields are mandatory.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2001/api/generate-ticket', {
        name,
        email,
        subject,
      });
      alert(`Ticket generated successfully! Ticket Number: ${response.data.ticketNumber}`);
      navigate.push('/my-data');
    } catch (error) {
      console.error('Error generating ticket:', error);
    }
  };

  return (
    <div>
      <h1>Ticket Page</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Subject: </label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default TicketPage;
