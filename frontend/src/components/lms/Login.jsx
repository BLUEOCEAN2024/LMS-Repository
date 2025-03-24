import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';  // Import AuthProvider
// ----------------------------------------------------------------------------------
import { useNavigate, Link } from 'react-router-dom';
// ----------------------------------------------------------------------------------

  const Login = ({handlePasswordReset, handleLoginSuccess})  => {
  // const navigate = useNavigate();
  
  const { setLoginUser } = useContext(AuthContext);  
  const [name, setUsername] = useState('');
  const [pwd, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, pwd };
      
    try {
      // Send the user data to the backend API
      const response = await axios.get(`http://localhost:9000/api/auth/login?name=${name}&password=${pwd}`);

      // console.log("response:"+response.data);      
      // console.log("loginId Value:", JSON.stringify(response.data, null, 2));  

      // Check if the registration was successful
      // if (response.data === null || response.data === undefined ) {// Handle any non-200 responses here
      if (!response.data) {// Handle any non-200 responses here
          alert('Invalid credentials');
        console.error('Login Error:', response.data);        
        handleLoginSuccess(false);
      } else {
        alert('User login successfully!');
        // console.log('Login User Id:', response.data.user_id);
        // console.log('Login Response:', response.data);
        setLoginUser(response.data); // Store loginIds
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
