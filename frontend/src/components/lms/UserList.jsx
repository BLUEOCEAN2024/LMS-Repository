import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
import AddUser from './AddUser';
import SearchUser from './SearchUser';
import { AuthContext } from './AuthContext';  // Import AuthProvider

// function UserList() {
function UserList() {  
  const { searchUsers, setSearchUsers, users, setUsers } = useContext(AuthContext);
  // const navigate = useNavigate();  // This hook allows navigation to another route
  //-------User-----------------------------------------------------------------
  // const [users, setUsers] = useState([]);
  // const [searchedUser, setSearchedUser] = useState(null);
  //------------------------------------------------------------------------
  const [showAddUserSection, setShowAddUserSection] = useState(false);
  const [showSearchUserSection, setShowSearchUserSection] = useState(false);  
  //------------------------------------------------------------------------
  useEffect(() => {
    // console.log("UserList: " + JSON.stringify(users, null, 2));
    // if (!showSearchUserSection) {
    //   setSearchUsers([]);
    // }

    if (users !== null && users !== "" ) {
    axios.get('http://localhost:9000/api/users')
      .then(response => {setUsers(response.data)      })
      .catch(error => console.error('Error fetching users:', error));
    } 

    
    if (users !== null && users !== "" ) {
      axios.get('http://localhost:9000/api/books')
        .then(response => {setBooks(response.data)})
        .catch(error => console.error('Error fetching books:', error));
    }
    
    // console.log("loginId (stringified):", JSON.stringify(users.user_id , null, 2));
    // console.log("loginId Type:", typeof loginId);
    // console.log("loginId Value:", JSON.stringify(loginId, null, 2));  
    // console.log("UserList: ", JSON.stringify(users, null, 2));
    // console.log("Number of users: ", users ? users.length : 0);

    }, []);

  const fetchUser = () => {
    axios.get('http://localhost:9000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
    };
    
  const handleUpdateUser = (userId) => {
    // Redirect to the UpdateBook component, passing the user's ID as a URL parameter
    navigate(`/update-user/${userId}`);
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:9000/api/users/deleteUserById/${id}`)
      .then(response => {
        setUsers(users.filter(user => users.user_id !== id)); // Update the users list
        fetchUser();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('There was an error deleting the user.');
      });
  };

  return (
    <div>
      {/* --------------------USERS---------------------------------------------------- */}
      <h2>User List</h2>
       <button onClick={() => setShowAddUserSection(!showAddUserSection)}>
        {showAddUserSection ? 'Hide Add User' : 'Add a New User'}
      </button>

      <button onClick={() => setShowSearchUserSection(!showSearchUserSection)}>
        {showSearchUserSection ? 'Hide Search User' : 'Search for a User'}
      </button>
      {showAddUserSection && <AddUser />}
      {showSearchUserSection && <SearchUser />}

      {/* {searchUsers && !showAddUserSection && (        
      )}  */}

      {/* {!searchUsers && !showSearchUserSection && !showAddUserSection && (
      )} */}

      {/* { !showSearchUserSection && !showAddUserSection && ( */}
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th hidden={true}>ID</th>
              <th >ID</th>
              <th>Name</th>
              <th>Password</th>
              <th>Identity</th>
              <th>Email</th>
              <th>Phone</th>            
              <th>Role</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? 
            (users.map(user => (
              <tr key={user.user_id}>
                {/* <td align="left" hidden={true}>{user.user_id}</td> */}
                <td align="left" >{user.user_id}</td>
                <td align="left">{user.name}</td>
                <td align="left">{user.pwd}</td>
                <td align="left">{user.identity}</td>
                <td align="left">{user.email}</td>
                <td align="left">{user.phone}</td>
                <td align="left">{user.role}</td>
                {/* <td align="center">{user.member_effective_from}</td> */}
                <td>
                  <button onClick={() => handleUpdateUser(user.user_id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))
          ) 
          : (
            <tr><td colSpan="6" align="center">No records found</td></tr>
          )}
          </tbody>
        </table>
      {/* )} */}
    </div>
  );
}

export default UserList;
