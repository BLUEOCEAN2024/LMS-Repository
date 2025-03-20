import './App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

import {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookList from './components/BookList';
import UserList from './components/UserList';
import AddBook from './components/AddBook';
import AddUser from './components/AddUser';
import UpdateBook from './components/UpdateBook';
import SearchBook from './components/SearchBook';
import SearchUser from './components/SearchUser';

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
  return (
    <Router>
    <div>
      <h1>Library Management System</h1>
      
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

      {!searchedBook && !showSearchBookSection && !showAddBookSection && (
        <BookList books={books} setBooks={setBooks} />
      )}

      {searchedBook && !showAddBookSection && (
        // <BookList books={[searchedBook]} setBooks={setBooks} handleDeleteBook={handleAllBook} />
        <BookList books={[searchedBook]} setBooks={setBooks} />
      )}

      {/* <Routes>
        <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />
        <Route path="/components/:id" element={<UpdateBook />} />   
      </Routes> */}

      {/* ------------------------------------------------------------------------ */}


    </div>
    
    </Router>
  );
}

export default App;
