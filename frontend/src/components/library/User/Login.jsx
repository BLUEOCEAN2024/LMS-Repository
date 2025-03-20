import React, { useState } from 'react';
import axios from 'axios';
import MainMenu from "../MainMenu";
import VerticalMenu from "../VerticalMenu"
// ----------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------------------

// const Login = ({ sendMessage } )  => {
  const Login = ()  => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axios.post('http://localhost:9090/api/auth/login', { username, password });
      axios.post('http://localhost:9090/api/auth/login', { username, password });
      // sendMessage (true);
      alert('Login successful');

      navigate('/main-menu', { state: { isVisible: true } }); // Redirect to <MainMenu />;      
    } catch (error) {
      // sendMessage (false);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
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
