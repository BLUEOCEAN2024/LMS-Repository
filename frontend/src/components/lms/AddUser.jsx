import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';  // Import AuthProvider

function AddUser() {
  
  const { loginUser, setUsers } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [identity, setIdentity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');  
  const [role, setRole] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [error, setError] = useState('');
  //------------------------------------------------------------------------
  
  const handleAddUser = () => {
    // const newBook = { name, pwd, identity, email, phone, membereffectivefrom, createdBy };
    const newUser = { name, pwd, identity, email, phone, role, created_by: loginUser.user_id };
     
    // console.log("loginUser (stringified):", JSON.stringify(loginUser.user_id, null, 2));
    // console.log("loginUser Type:", typeof loginUser.user_id);
    // console.log("loginUser Value:", JSON.stringify(loginUser.user_id, null, 2));  

    axios.post('http://localhost:9000/api/users/addUser', newUser)
      .then(response => {
        setUsers(prevUsers => [...prevUsers, response.data]);
        setName('');
        setPwd('');
        setIdentity('');
        setEmail('');
        setPhone('');
        setRole('');
        setCreatedBy('');
        setError('');
      })
      .catch(error => {        
        console.error('values:' +  JSON.stringify(newUser, null, 2));
        setError('There was an error adding the book.');
      });
  };

  return (
    <div>
      <h3>Add a New User</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <input type="text" placeholder="Identity" value={identity} onChange={(e) => setIdentity(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />      
      {/* <input type="number" placeholder="Member Effective From" value={membereffectivefrom} onChange={(e) => setMemberEffectiveFrom(e.target.value)} /> */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Select" disable >Select</option>
        <option value="LIBRARIAN">Librarian</option>
        <option value="MEMBER">Member</option>
      </select>
      {/* <input type="text" placeholder="Created By" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} /> */}
      <button onClick={handleAddUser}>Add User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddUser;
