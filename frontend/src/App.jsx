import './App.css';
import { React, useEffect, useState, useContext } from 'react';
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
import Logout from './components/lms/Logout';
import Register from './components/lms/Register';
import PasswordReset from './components/lms/PasswordReset';
import UpdateUser from './components/lms/UpdateUser';
import { AuthProvider } from './components/lms/AuthContext';  // Import AuthProvider
import NavBar from "./components/lms/NavBar";

function App() {
   //-------User-----------------------------------------------------------------
  // const [users, setUsers] = useState([]);
  // const [userId, setUserId] = useState(false);  
  // const [loginId, setLoginId] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state
  const [isRegistering, setIsRegistering] = useState(true);  
  const [currentOption, setCurrentOption] = useState(true);  

  useEffect(() => {
    // console.log("useEffect:" + isRegistering);
  },  []);
  
  // Handle login success and set isAuthenticated to true
  const handleLoginSuccess = (isLogin) => {
    // console.log("isLogin:"+isLogin)
    if (isLogin == true) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false);
      // setLoginId(null);  // Optionally reset userId
      // navigate('/');  // Redirect to the home page (login/register page)
    };
  };

  // Handle logout and reset authentication state
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handle login success and set isAuthenticated to true
  const handlePasswordReset = (option) => {
      setCurrentOption(option);
  };
  
  // Toggle between Register and Login
  const toggleForm = () => {
    setIsRegistering(!isRegistering); 
    // console.log("toggle:" + isRegistering);
    if (!isRegistering) 
      {setCurrentOption("register");}
    else 
      {setCurrentOption("login");}
  };

  return (
    <AuthProvider>
    <Router>
      <div>
        <h1>Library Management System</h1>
        
        {/* Show login/register form if not authenticated */}
        {!isAuthenticated ? (
          <div className="form-container">
            {/* {isRegistering ? <Register /> : <Login setUserId={setUserId} handleLoginSuccess={handleLoginSuccess} />} */}
            {currentOption === "reset" ? (
              <PasswordReset setCurrentOption={setCurrentOption}/>
            ) : currentOption === "login" ? (
              <Login handlePasswordReset={handlePasswordReset} handleLoginSuccess={handleLoginSuccess}/>
            ) : (
              <Register />
            )}
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
              <Route path="/add-user/" element={<AddUser />} />
              <Route path="/update-book/:id" element={<UpdateBook />} />
              <Route path="/search-book" element={<SearchBook />} />
              <Route path="/search-borrow-rec" element={<SearchBorrowRec />} />
              <Route path="/search-user" element={<SearchUser />} />
              <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/update-user/:userid" element={<UpdateUser />} />
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
  </AuthProvider>
  );
}

export default App;
