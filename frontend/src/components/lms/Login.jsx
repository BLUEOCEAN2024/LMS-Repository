import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------------------

  const Login = ({handlePasswordReset, handleLoginSuccess})  => {
  // const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [pwd, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, pwd };
      
    try {
      // Send the user data to the backend API
      const response = await axios.get(`http://localhost:9000/api/auth/login?name=${name}&password=${pwd}`);
      // const response = axios.get(`http://localhost:9000/api/auth/login?name=${name}&password=${pwd}`);
      console.log("response:"+response.data);
      // Check if the registration was successful
      // if (response.data === null || response.data === undefined ) {// Handle any non-200 responses here
      if (!response.data) {// Handle any non-200 responses here
          alert('Invalid credentials');
        console.error('Login Error:', response.data);        
        handleLoginSuccess(false);
      } else {
        alert('User login successfully!');
        console.log('Login Response:', response.data);
        handleLoginSuccess(true);
      }
    } catch (error) {
      // console.error('values:' +  JSON.stringify(user, null, 2));
      console.error('Error details:', error);
      alert('Error Login user');       
      handleLoginSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={pwd}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <a onClick={() => handlePasswordReset('reset')}>Reset Password</a>
        
    </form>
  );
};

export default Login;
