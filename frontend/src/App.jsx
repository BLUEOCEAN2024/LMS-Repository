import './App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import BookList from './components/lms/BookList';
import BorrowList from './components/lms/BorrowList';
import UserList from './components/lms/UserList';
import AddBook from './components/lms/AddBook';
import AddUser from './components/lms/AddUser';
import UpdateBook from './components/lms/UpdateBook';
import SearchBook from './components/lms/SearchBook';
import SearchBorrowRec from './components/lms/SearchBorrowRec';
import SearchUser from './components/lms/SearchUser';
import Login from './components/lms/Login';
import Register from './components/lms/Register';

import NavBar from "./components/lms/NavBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state
  const [isRegistering, setIsRegistering] = useState(true);  

  // Handle login success and set isAuthenticated to true
  const handleLoginSuccess = (isLogin) => {
    if (isLogin == true) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(true);
    }
  };

  // Handle logout and reset authentication state
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Toggle between Register and Login
  const toggleForm = () => {
    setIsRegistering(!isRegistering); 
  };

  return (
    <Router>
      <div>
        <h1>Library Management System</h1>
        
        {/* Show login/register form if not authenticated */}
        {!isAuthenticated ? (
          <div className="form-container">
            {isRegistering ? <Register /> : <Login handleLoginSuccess={handleLoginSuccess} />}
          </div>
        ) : (
          <>
            {/* Navigation menu only after successful login */}
            {/* <nav>
              <ul>
                <li><Link to="/books">Book and Lending Management </Link></li>
                <li><Link to="/borrow-history">Lending History</Link></li>
                <li><Link to="/users">User Management</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </nav> */}
            <NavBar />
            {/* Define Routes for different components */}
            <Routes>
              <Route path="/book-management" element={<BookList />} />
              <Route path="/lending-management" element={<BorrowList />} />
              <Route path="/user-management" element={<UserList />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/update-book" element={<UpdateBook />} />
              <Route path="/search-book" element={<SearchBook />} />
              <Route path="/search-borrow-rec" element={<SearchBorrowRec />} />
              <Route path="/search-user" element={<SearchUser />} />
            </Routes>
          </>
        )}

        {/* Form toggle buttons for Register/Login */}
        {!isAuthenticated && (
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
        )}
      </div>
    </Router>
  );
}

export default App;
