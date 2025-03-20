import './App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

import {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookList from './components/lms/BookList';
import UserList from './components/lms/UserList';
import AddBook from './components/lms/AddBook';
import AddUser from './components/lms/AddUser';
import UpdateBook from './components/lms/UpdateBook';
import SearchBook from './components/lms/SearchBook';
import SearchUser from './components/lms/SearchUser';
import Login from './components/lms/Login';
import Register from './components/lms/Register';

function App() {
  const [error, setError] = useState('');  
  //-------User-----------------------------------------------------------------
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  //------------------------------------------------------------------------
  const [showAddUserSection, setShowAddUserSection] = useState(false);
  const [showSearchUserSection, setShowSearchUserSection] = useState(false);  
  //-------Book----------------------------------------------------------------
  const [books, setBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null);
  //------------------------------------------------------------------------
  const [showAddBookSection, setShowAddBookSection] = useState(false);
  // const [showUpdateBookSection, setShowUpdateBookSection] = useState(false);
  const [showSearchBookSection, setShowSearchBookSection] = useState(false);
  //------------------------------------------------------------------------
  const [isRegistering, setIsRegistering] = useState(true);  

  useEffect(() => {
    axios.get('http://localhost:9000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
      
    axios.get('http://localhost:9000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  },  []);

  //------------------------------------------------------------------------
  const handleAllBook = () => {
    axios.get('http://localhost:9000/api/books')
      .then(response => {
        setBooks(response.data);
        // setShowAddBookSection(false);
        // setShowSearchBookSection(false);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  // ------------------------------------------------------------------------
  const handleAllUser = () => {
    axios.get('http://localhost:9000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  //------------------------------------------------------------------------
  const toggleForm = () => {
    setIsRegistering(!isRegistering); // Toggle the form between Register and Login
  };
  //------------------------------------------------------------------------
  return (
    <Router>

    <div >
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

      {/* --------------------USERS---------------------------------------------------- */}
      <button onClick={() => setShowAddUserSection(!showAddUserSection)}>
        {showAddUserSection ? 'Hide Add User' : 'Add a New User'}
      </button>

      <button onClick={() => setShowSearchUserSection(!showSearchUserSection)}>
        {showSearchUserSection ? 'Hide Search User' : 'Search for a User'}
      </button>
      
      {showAddUserSection && <AddUser setUsers={setUsers} />}
      {/* {showUpdateBookSection && <UpdateBook setBooks={setBooks} />} */}
      {showSearchUserSection && <SearchUser setSearchedUser={setSearchedUser} />}

      <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>

      {!searchedUser && !showSearchUserSection && !showAddUserSection && (
        <UserList users={users} setUsers={setUsers} />
      )}

      {searchedUser && !showAddUserSection && (
        <UserList users={[searchedUser]} setUsers={setUsers} />
      )}
      
      {/* ---------------------BOOKS--------------------------------------------------- */}
      <button onClick={() => setShowAddBookSection(!showAddBookSection)}>
        {showAddBookSection ? 'Hide Add Book' : 'Add a New Book'}
      </button>

      <button onClick={() => setShowSearchBookSection(!showSearchBookSection)}>
        {showSearchBookSection ? 'Hide Search Book' : 'Search for a Book'}
      </button>

      {showAddBookSection && <AddBook setBooks={setBooks} />}
      {/* {showUpdateBookSection && <UpdateBook setBooks={setBooks} />} */}
      {showSearchBookSection && <SearchBook setSearchedBook={setSearchedBook} />}

      <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>

      {/* display all book*/}
      {/* {!searchedBook && !showSearchBookSection && !showAddBookSection && (
        <BookList books={books} setBooks={setBooks} />
      )} */}

      {/* display search result */}
      {searchedBook && !showAddBookSection && (
        // <BookList books={[searchedBook]} setBooks={setBooks} handleDeleteBook={handleAllBook} />
        <BookList books={[searchedBook]} setBooks={setBooks} />
      )}

      {/* ------------------------------------------------------------------------ */}


    </div>
      <Routes>
        {/* {!searchedBook || !showSearchBookSection || !showAddBookSection ||  */}
          <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />  
        {/* } */}
        {/* <Route path="/update-book/:id" element={<UpdateBook />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
