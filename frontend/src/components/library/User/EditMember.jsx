// src/components/EditMember.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMember = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9090/api/users/${id}`)
      .then((response) => {
        const member = response.data;
        setName(member.name);
        setAddress(member.address);
        setContact(member.contact);
      })
      .catch(error => console.error("There was an error fetching the member!", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMember = { name, address, contact };
    axios.put(`http://localhost:9090/api/users/${id}`, updatedMember)
      .then(() => {
        navigate("/");
      })
      .catch(error => console.error("There was an error updating the member!", error));
  };

  return (
    <div>
      <h2>Edit Member</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMember;
