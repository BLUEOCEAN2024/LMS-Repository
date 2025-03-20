
import React, { useState } from 'react';
import Register from './components/library/Register';
import Login from './components/library/Login';
import Profile from './components/library/Profile';
// ----------------------------------------------------------------------------------

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberList from "./components/library/MemberList";
import AddMember from "./components/library/AddMember";
import EditMember from "./components/library/EditMember";
// ----------------------------------------------------------------------------------
import './App.css'; // Add styles to enhance the look

function App() {
  // State to toggle between Register and Login
  const [isRegistering, setIsRegistering] = useState(true);

  const toggleForm = () => {
    setIsRegistering(!isRegistering); // Toggle the form between Register and Login
  };

  return (
    // <Router>
    // <Routes>
    //   <Route path="/" element={<MemberList />} />
    //   <Route path="/add" element={<AddMember />} />
    //   <Route path="/edit/:id" element={<EditMember />} />
    // </Routes>
    
    <div className="App">
      
      <h1>Library Management System</h1>
      <div className="form-toggle-buttons">
        <button
          className={`toggle-button ${isRegistering ? 'active' : ''}`}
          onClick={toggleForm}
        >
          Register
        </button>
        <button
          className={`toggle-button ${!isRegistering ? 'active' : ''}`}
          onClick={toggleForm}
        >
          Login
        </button>
      </div>

      <div className="form-container">
        {isRegistering ? <Register /> : <Login />}
      </div>
    </div>
    // </Router>
  );
}


export default App;
