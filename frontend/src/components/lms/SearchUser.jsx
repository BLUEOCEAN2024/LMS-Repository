import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import AuthProvider

// function SearchUser({ handleSearchUser }) {
function SearchUser() {  
  const navigate = useNavigate();  // This hook allows navigation to another route
  const { users, setUsers } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [error, setError] = useState(null); // To handle error messages

  const handleSearchUser = async () => {   
    setError(''); // Reset error message before new request

    try {
      let response;
      if (name && name.trim() !== "") {
        console.log("name:"+name);
        response = await axios.get(`http://localhost:9000/api/users/getUserByName/${name}`);
      } else {
        response = await axios.get('http://localhost:9000/api/users');
      }

      // console.log(response.data);
      setUsers(response.data);      
      console.log('SearchUser:' +  JSON.stringify(users, null, 2));
      // navigate("/book-management");
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again.');
    }
  };

  useEffect(() => {
    console.log('users.length:' +  users.length);
    // console.log('SearchBook:' +  JSON.stringify(books, null, 2));
    if (users.length > 0) {   // ✅ Only navigate when books are updated
      navigate("/user-management");
    }
  }, [users, navigate]);  // ✅ Runs when books change

  return (
    <div>
      <input type="text" placeholder="Search by Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSearchUser}>Search User</button>      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
    </div>
  );
}

export default SearchUser;
