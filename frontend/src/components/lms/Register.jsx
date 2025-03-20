import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user = { name, email, password, role };
    
  //   try {
  //     // await axios.post('http://localhost:9090/api/users/register', user);
      
  //     console.error('values:' +  JSON.stringify(user, null, 2));
  //     axios.post('http://localhost:9000/api/users/registerUser', user);
  //     alert('User registered successfully!');
  //   } catch (error) {      
  //     console.error('values:' +  JSON.stringify(user, null, 2));
  //     alert('Error registering user');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = { name, email, password, role };
  
    try {
      // Send the user data to the backend API
      const response = await axios.post('http://localhost:9000/api/users/registerUser', user);
      
      // Check if the registration was successful
      if (response.status === 200) {
        alert('User registered successfully!');
        console.log('Registration Response:', response.data);
      } else {
        // Handle any non-200 responses here
        alert('Error registering user');
        console.error('Registration Error:', response.data);
      }
    } catch (error) {
      // In case of error in the request
      console.error('Error details:', error);
      alert('Error registering user');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
