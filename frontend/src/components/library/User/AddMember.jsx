// src/components/AddMember.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMember = () => {  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = { username, email, password, role };

    // axios.post("http://localhost:9090/api/users/addMember", newMember)
    axios.post('http://localhost:9090/api/users/register', newMember)
      .then(() => {
        navigate("/user-management");
      })
      .catch(error => {        
        console.error('values:' +  JSON.stringify(newMember, null, 2));
        console.error("There was an error adding the member!", error)
      });
  };

  return (
    <div>
      <h2>Add New Member</h2>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="MEMBER">Member</option>
        <option value="LIBRARIAN">Librarian</option>
      </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMember;
