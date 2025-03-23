import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBorrowRec from './SearchBorrowRec';

// function BorrowList({ borrowRecs, setBorrowRecs }) {
function BorrowList() {
  const navigate = useNavigate();  // This hook allows navigation to another route
  //-------Borrow History----------------------------------------------------------------
  const [borrowRecs, setBorrowRecs] = useState([]);
  const [searchedBorrowRec, setSearchedBorrowRec] = useState(null);
  //------------------------------------------------------------------------
  const [showSearchBorrowRecSection, setShowSearchBorrowRecSection] = useState(false);  

  useEffect(() => {
    axios.get('http://localhost:9000/api/borrowhistory')
      .then(response => setBorrowRecs(response.data))
      .catch(error => console.error('Error fetching borrow records:', error));
    },  []);

  const handleAllBorrowRec = () => {
      axios.get('http://localhost:9000/api/borrowhistory')
      .then(response => setBorrowRecs(response.data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleReleaseReservedBook = (bookid,user_id) => {
    console.log(user_id);
    const response = axios.post(`http://localhost:9000/api/borrowhistory/releaseReservedBook?bookid=${bookid}&userid=${user_id}`)
    
     // Check if the registration was successful
     if (response.status === 200) {
      // Handle any non-200 responses here
      alert('Book is not released!');
      console.error('Release Error:', response.data);
    } else {
      alert('Book released successfully!');
      console.log('Release Response:', response.data);
      handleAllBorrowRec();
    }
  };

  const handleBorrowReservedBook = (bookid,user_id) => {
    console.log(user_id);
    const response = axios.post(`http://localhost:9000/api/borrowhistory/borrowReservedBook?bookid=${bookid}&userid=${user_id}`)
    
     // Check if the registration was successful
     if (response.status === 200) {
      alert('Reserved Book borrowed successfully!');
      console.log('Reserved Book Response:', response.data);
      handleAllBorrowRec();
    } else {
      // Handle any non-200 responses here
      alert('Book is not borrowed!');
      console.error('Reserved Book Error:', response.data);
    }
  };

  const handleReturnBook = async (bookid,user_id) => {
    const response = axios.post(`http://localhost:9000/api/borrowhistory/returnBook?bookid=${bookid}&userid=${user_id}`)
    console.log(response.status)
     // Check if the registration was successful
     if (response.status === 200) {
      // Handle any non-200 responses here
      alert('Book is not available!');
      console.error('Return Error:', response.data);
    } else {
      alert('Book returned successfully!');
      console.log('Return Response:', response.data);
      // Refresh data after borrowing the book
      await handleAllBorrowRec();
    }
  };

  return (
    <div>
      <h2>Borrow History </h2>
      {/* --------------Borrow History---------------------------------------------------------- */}
      <button onClick={() => setShowSearchBorrowRecSection(!showSearchBorrowRecSection)}>
        {showSearchBorrowRecSection ? 'Hide Search Borrow Histoy' : 'Search for a User Borrow History'}
      </button>

      {showSearchBorrowRecSection && <SearchBorrowRec searchedBorrowRec={[borrowRecs]} setSearchedBorrowRec={setBorrowRecs} />}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
        <tr>
            <th>ID</th>
            <th>Book ID</th>
            <th>User ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Borrow</th>
            <th>Return</th>
            <th>Release</th>
        </tr>
        </thead>
        <tbody>
        {borrowRecs && borrowRecs.length > 0 ? (
            borrowRecs.map(borrowRec => (
            <tr key={borrowRec.hist_id}> {/* Ensure hist_id is unique */}
                <td align="left">{borrowRec.hist_id}</td>
                <td align="left">{borrowRec.book_id}</td>
                <td align="left">{borrowRec.user_id}</td>
                <td align="left">{borrowRec.borrow_dt}</td>
                <td align="left">{borrowRec.return_dt}</td>
                <td align="center">{borrowRec.status}</td>
             <td>
                <button onClick={() => handleBorrowReservedBook(borrowRec.book_id, user_id)}>Borrow</button>
              </td>
              <td>
                <button onClick={() => handleReturnBook(borrowRec.book_id, user_id)}>Return</button>
              </td>
              <td>
                <button onClick={() => handleReleaseReservedBook(borrowRec.book_id, user_id)}>Release</button>
              </td>
            </tr> 
            ))
        ) : (
            <tr><td colSpan="6" align="center">No records found</td></tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowList;
