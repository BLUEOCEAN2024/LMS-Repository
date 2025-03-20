import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ setUsers }) {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [identity, setIdentity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');  
  // const [membereffectivefrom, setMemberEffectiveFrom] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [error, setError] = useState('');
  //------------------------------------------------------------------------
  
  const handleAddUser = () => {
    // const newBook = { name, pwd, identity, email, phone, membereffectivefrom, createdBy };
    const newUser = { name, pwd, identity, email, phone, created_by: createdBy };
    
    axios.post('http://localhost:9000/api/users/addUser', newUser)
      .then(response => {
        setUsers(prevUsers => [...prevUsers, response.data]);
        setName('');
        setPwd('');
        setIdentity('');
        setEmail('');
        setPhone('');
        // setMemberEffectiveFrom('');a
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
      <input type="text" placeholder="Created By" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddUser;
