import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import AuthProvider

// function SearchUser({ handleSearchUser }) {
function SearchUser() {  
  const { setSearchUsers, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();  // This hook allows navigation to another route
  const [name, setName] = useState('');
  const [error, setError] = useState(null); // To handle error messages

  const handleSearchUser = () => {    
    // console.log(name);
    if (!name) {
      // setSearchUsers([]);
      setUsers([]);
      return;
    }
    axios.get(`http://localhost:9000/api/users/getUserByName/${name}`)
      .then(response => {        
        // console.log("SearchUser: " + JSON.stringify(response.data, null, 2));        
      if (!response.data || Array.isArray(response.data) && response.data.length === 0) {
        // setSearchUsers([]);
        setUsers([]);
        setError("User not found!");
      }
      else {
        // setSearchUsers(response.data); 
        setUsers(prevUsers => [...prevUsers, response.data]);
        // navigate("/user-management");
      }
      })
      .catch(error => console.error('Error fetching user:', error));
  };

  return (
    <div>
      <input type="text" placeholder="Search by Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSearchUser}>Search User</button>      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
    </div>
  );
}

export default SearchUser;
