
import React, { useState } from 'react';
import NavBar from './components/library/NavBar';
import Login from './components/library/User/Login';
import Profile from './components/library/User/Profile';
import Register from './components/library/User/Register';
// ----------------------------------------------------------------------------------
import MemberList from "./components/library/User/MemberList";
import AddMember from "./components/library/User/AddMember";
import EditMember from "./components/library/User/EditMember";
// import BookList from "./components/library/BookList";
import MainMenu from './components/library/MainMenu';
// ----------------------------------------------------------------------------------
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ----------------------------------------------------------------------------------
import './App.css'; // Add styles to enhance the look

// Main App component that wraps everything in AuthProvider
function App() {
 // State to toggle between Register and Login
  const [isRegistering, setIsRegistering] = useState(true);  
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status

  const toggleForm = () => {
    setIsRegistering(!isRegistering); // Toggle the form between Register and Login
  };

  const handleisLoggedIn = (isLoggedInStatus) => {
    setIsLoggedIn(isLoggedInStatus);
  };

  return (
    <Router>
      <Routes>      
        <Route path="/main-menu" element={<MainMenu isVisible={false} />} />
        <Route path="/user-management" element={<MemberList isVisible={false} />} />        
        <Route path="/add-user" element={<AddMember />} />      
        <Route path="/edit-user" element={<EditMember />} />
        {/* <Route path="/book-management" element={<BookList />} />  */}
        {/* <Route path="/lending-management" element={<LendingManagement />} />
        <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    
    <div>
      {/* {isLoggedIn && (
          <div> */}
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
          {/* {isRegistering ? <Register /> : <Login isLoggedIn={handleisLoggedIn} />} */}
          {isRegistering ? <Register /> : <Login />}
        </div>
      {/* </div>
      )} */}
    </div>
    </Router>
  );
}

export default App;
