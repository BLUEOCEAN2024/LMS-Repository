import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const username = 'user'; // Replace with actual username

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/profile/${username}`);
      setUser(response.data);
    };
    
    fetchUser();
  }, [username]);

  return user ? (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
