import React, { useState } from 'react';
import axios from 'axios';
// import MainMenu from "../MainMenu";
// import VerticalMenu from "../VerticalMenu"
// ----------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------------------

// const Login = ({ sendMessage } )  => {
  const Login = ()  => {
  // const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // await axios.post('http://localhost:9090/api/auth/login', { username, password });
    //   axios.post('http://localhost:9090/api/auth/login', { username, password });
    //   // sendMessage (true);
    //   alert('Login successful');

    //   // navigate('/main-menu', { state: { isVisible: true } }); // Redirect to <MainMenu />;      
    // } catch (error) {
    //   // sendMessage (false);
    //   alert('Invalid credentials');
    // }

    const user = { name, password };

    try {
      // Send the user data to the backend API
      const response = await axios.get('http://localhost:9000/api/auth/login', user);
      
      // Check if the registration was successful
      if (response.status === 200) {
        alert('User login successfully!');
        console.log('Login Response:', response.data);
      } else {
        // Handle any non-200 responses here
        alert('Invalid credentials');
        console.error('Login Error:', response.data);
      }
    } catch (error) {
      // In case of error in the request    
      console.error('values:' +  JSON.stringify(user, null, 2));
      console.error('Error details:', error);
      alert('Error Login user');
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
