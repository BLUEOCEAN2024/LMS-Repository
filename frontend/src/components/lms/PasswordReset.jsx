import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordReset = ({setCurrentOption}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Using useNavigate

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:9000/api/passwordreset/update-password?email=${email}&newPassword=${password}`);
      
      // Check if the response is successful
      if (response.status === 200) {
        alert('Password has been reset successfully.');
        // setTimeout(() => {
          // navigate('/login'); // Redirect to login after success
          setCurrentOption("login");
        // }, 2000);
      } else {
        alert('Password reset failed!');
        console.error('Error:', response.data);
      }
    } catch (error) {
      setMessage('Error: ' + error.response?.data || error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
