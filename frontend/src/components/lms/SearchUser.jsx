import React, { useState } from 'react';
import axios from 'axios';

function SearchUser({ setSearchedUser }) {
  const [name, setName] = useState('');

  const handleSearchUser = () => {
    if (!name) {
      setSearchedUser(null);
      return;
    }
    axios.get(`http://localhost:9000/api/user/getUserByName/${name}`)
      .then(response => setSearchedUser(response.data))
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
