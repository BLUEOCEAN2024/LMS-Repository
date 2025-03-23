import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    pwd: '', // Add other fields as necessary
    identity: '',
  });

  // console.log(userid);

  useEffect(() => {
    // Fetch the user data when the component mounts based on the userId from URL
    axios.get(`http://localhost:9000/api/users/getUserById/${userid}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        alert('There was an issue fetching the user data.');
      });
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated user data to the server
    axios.post(`http://localhost:9000/api/users/updateUser/${userid}`, user)
      .then(response => {
        alert('User updated successfully!');
        navigate('/user-management'); // Redirect to the user list page after update
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('There was an issue updating the user.');
      });
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="identity">Identity:</label>
          <input
            type="identity"
            id="identity"
            name="identity"
            value={user.identity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          {/* <input
            type="text"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          /> */}

        <select value={user.role} onChange={(e) => setRole(e.target.value)}>
            <option value="Select" disable >Select</option>
            <option value="LIBRARIAN">Librarian</option>
            <option value="MEMBER">Member</option>
        </select>
        </div>

        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={user.pwd}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
