import './App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';

import {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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


function App() {
  const user_id = 1;
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
   //-------Borrow History----------------------------------------------------------------
  const [borrowRecs, setBorrowRecs] = useState([]);
  const [searchedBorrowRec, setSearchedBorrowRec] = useState(null);
   //------------------------------------------------------------------------
   const [showSearchBorrowRecSection, setShowSearchBorrowRecSection] = useState(false);  
   //------------------------------------------------------------------------
  const [isRegistering, setIsRegistering] = useState(true);  

  useEffect(() => {
    axios.get('http://localhost:9000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
      
    axios.get('http://localhost:9000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
      
    axios.get('http://localhost:9000/api/borrowhistory')
      .then(response => setBorrowRecs(response.data))
      .catch(error => console.error('Error fetching borrow records:', error));

    },  []);

  //------------------------------------------------------------------------
  const handleAllBook = () => {
    axios.get('http://localhost:9000/api/books')
      .then(response => {
        setBooks(response.data);
        // setShowAddBookSection(false);
        // setShowSearchBookSection(false);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  // ------------------------------------------------------------------------
  const handleAllUser = () => {
    axios.get('http://localhost:9000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  // ------------------------------------------------------------------------
  const handleAllBorrowRec = () => {
    axios.get('http://localhost:9000/api/borrowhistory')
      .then(response => {
        setBorrowRecs(response.data);
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
      <h1>User List</h1>
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
      <h1>Book List</h1>
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
      {!searchedBook && !showSearchBookSection && !showAddBookSection && (
        <BookList user_id = {user_id} books={books} setBooks={setBooks} />
      )}

      {/* display search result */}
      {searchedBook && !showAddBookSection && (
        // <BookList books={[searchedBook]} setBooks={setBooks} handleDeleteBook={handleAllBook} />
        <BookList user_id = {user_id} books={[searchedBook]} setBooks={setBooks} />
      )}

    
      {/* <Routes> */}
        {/* {!searchedBook || !showSearchBookSection || !showAddBookSection ||  */}
          {/* <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />   */}
        {/* } */}
        {/* <Route path="/update-book/:id" element={<UpdateBook />} /> */}
      {/* </Routes> */}

      {/* --------------Borrow History---------------------------------------------------------- */}
      <h1>Borrow History</h1>
      <button onClick={() => setShowSearchBorrowRecSection(!showSearchBorrowRecSection)}>
        {showSearchBorrowRecSection ? 'Hide Search Borrow Histoy' : 'Search for a User Borrow History'}
      </button>

      {showSearchBorrowRecSection && <SearchBorrowRec searchedBorrowRec={[borrowRecs]} setSearchedBorrowRec={setBorrowRecs} />}

      {/* {searchedBorrowRec && showSearchBorrowRecSection && (
         <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book ID</th>
              <th>User ID</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchedBorrowRec && searchedBorrowRec.length > 0 ? (
              searchedBorrowRec.map(borrowRec => (
                <tr key={borrowRec.hist_id}>
                  <td align="left">{borrowRec.hist_id}</td>
                  <td align="left">{borrowRec.book_id}</td>
                  <td align="left">{borrowRec.user_id}</td>
                  <td align="left">{borrowRec.borrow_dt}</td>
                  <td align="left">{borrowRec.return_dt}</td>
                  <td align="center">{borrowRec.status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" align="center">No records found</td></tr>
            )}
          </tbody>
        </table>
      )} */}

      {/* <BorrowList borrowRecs={[borrowRecs]} setBorrowRecs={setBorrowRecs}/> */}
      {/* {!searchedBorrowRec && !showSearchBorrowRecSection && ( */}
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book ID</th>
              <th>User ID</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowRecs && borrowRecs.length > 0 ? (
              borrowRecs.map(borrowRec => (
                <tr key={borrowRec.hist_id}>
                  <td align="left">{borrowRec.hist_id}</td>
                  <td align="left">{borrowRec.book_id}</td>
                  <td align="left">{borrowRec.user_id}</td>
                  <td align="left">{borrowRec.borrow_dt}</td>
                  <td align="left">{borrowRec.return_dt}</td>
                  <td align="center">{borrowRec.status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" align="center">No records found</td></tr>
            )}
          </tbody>
        </table>
      {/* )}  */}

      </div>
    </Router>
  );
}

export default App;
