import React, { useState } from 'react';
import axios from 'axios';

// function SearchUser({ setSearchedUser }) {
function SearchUser({ users, setUsers }) {
  const [name, setName] = useState('');

  const handleSearchUser = () => {
    if (!name) {
      setUsers(null);
      return;
    }
    console.log(name);
    axios.get(`http://localhost:9000/api/users/getUserByName/${name}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching user:', error));
  };

  return (
    <div>
      <input type="text" placeholder="Search by Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSearchUser}>Search User</button>
    </div>
  );
}

export default SearchUser;
