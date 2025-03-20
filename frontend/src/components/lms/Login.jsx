import React, { useState } from 'react';
import axios from 'axios';
// import MainMenu from "../MainMenu";
// import VerticalMenu from "../VerticalMenu"
// ----------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------------------

  const Login = ({handleLoginSuccess})  => {
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
    
      // Check if the registration was successful
      if (response.status === 200) {
        alert('User login successfully!');
        console.log('Login Response:', response.data);
        handleLoginSuccess(true);
      } else {
        // Handle any non-200 responses here
        alert('Invalid credentials');
        console.error('Login Error:', response.data);        
        handleLoginSuccess(false);
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
    </form>
  );
};

export default Login;
