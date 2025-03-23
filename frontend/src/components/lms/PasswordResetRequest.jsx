import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordResetRequest = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/passwordreset/reset-password', email)
      .then(response => {
        setMessage('Password reset link has been sent to your email.');
      })
      .catch(error => {
        setMessage('Error: ' + error.response.data);
      });
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handlePasswordResetRequest}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Request Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequest;
