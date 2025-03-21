import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddUser from './AddUser';
import SearchUser from './SearchUser';

// function UserList({ users, setUsers }) {
function UserList({user_id}) {
  const navigate = useNavigate();  // This hook allows navigation to another route
  //-------User-----------------------------------------------------------------
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  //------------------------------------------------------------------------
  const [showAddUserSection, setShowAddUserSection] = useState(false);
  const [showSearchUserSection, setShowSearchUserSection] = useState(false);  
  //------------------------------------------------------------------------
  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
    },  []);

  const handleUpdateUser = (users) => {
    // Redirect to the UpdateBook component, passing the user's ID as a URL parameter
    // navigate(`/components/${users.user_id}`);
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:9000/api/users/deleteUserById/${id}`)
      .then(response => {
        setUsers(users.filter(user => users.user_id !== id)); // Update the users list
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
      {showAddUserSection && <AddUser setUsers={setUsers} />}
      {showSearchUserSection && <SearchUser setUsers={setUsers} />}

      {/* {!searchedUser && !showSearchUserSection && !showAddUserSection && (
        <UserList users={users} setUsers={setUsers} />
      )}

      {searchedUser && !showAddUserSection && (
        <UserList users={[searchedUser]} setUsers={setUsers} />
      )}  */}

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
            {/* <th>Member Effective From</th> */}
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
          users.map(user => (
            <tr key={user.user_id}>
              {/* <td align="left" hidden={true}>{user.user_id}</td> */}
              <td align="left" >{user.user_id}</td>
              <td align="left">{user.name}</td>
              <td align="left">{user.pwd}</td>
              <td align="left">{user.identity}</td>
              <td align="left">{user.email}</td>
              <td align="left">{user.phone}</td>
              {/* <td align="center">{user.member_effective_from}</td> */}
              <td>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="6" align="center">No records found</td></tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
