// src/components/MemberList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------------------
import { useLocation  } from 'react-router-dom';
// ----------------------------------------------------------------------------------

const MemberList = () => {

  const location = useLocation();
  const isVisible = location.state?.isVisible;

  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/api/users")
      .then(response => setMembers(response.data))
      .catch(error => console.error("There was an error fetching members!", error));
  }, []);

  // const deleteMember = (id) => {
  //   axios.delete(`http://localhost:9090/api/users/${id}`)
  //     .then(() => {
  //       setMembers(members.filter(member => member.id !== id));
  //     })
  //     .catch(error => console.error("There was an error deleting the member!", error));
  // };

  return (
    <div>
      
    {isVisible && (
      <div>
      <h2>Member List</h2>
      <table border="0">
        <thead>
            <tr>
              <th><Link to="/add-user">Add Member</Link></th>
              <th width="10"></th>
              <th><Link to="/edit-user">Edit Member</Link></th>
              <th width="10"></th>
              <th><Link to="//user-management">All Member</Link></th>
              <th width="10"></th>
            </tr>
        </thead>
      </table>     
      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Profile Picture</th>
            <th>isActive</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>{member.profilePicture}</td>
              <td>{member.isActive}</td>
              <td>
                <Link to={`/edit/${member.id}`}>Edit</Link>
                <button onClick={() => deleteMember(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
    </div>
  );
};

export default MemberList;
