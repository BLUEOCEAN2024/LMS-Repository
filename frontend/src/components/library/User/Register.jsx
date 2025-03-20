import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, email, password, role };
    
    try {
      // await axios.post('http://localhost:9090/api/users/register', user);
      axios.post('http://localhost:9090/api/users/register', user);
      alert('User registered successfully!');
    } catch (error) {      
      console.error('values:' +  JSON.stringify(user, null, 2));
      alert('Error registering user');
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
