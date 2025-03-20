import React, { useState } from 'react';
import axios from 'axios';

function SearchBorrowRec({ searchedBorrowRec, setSearchedBorrowRec }) {
    const [book_id, setBookID] = useState('');

  const handleSearchBorrowRec = () => {
    if (!book_id) {
        setSearchedBorrowRec(null);
        return;
    }

    axios.get(`http://localhost:9000/api/borrowhistory/searchBorrowHistoryByBookId?bookid=${book_id}`)
      .then(response => setSearchedBorrowRec(response.data))
      .catch(error => console.error('Error fetching book:', error));
    };
  
  return (
    <div>
      <input type="text" placeholder="Search by Book ID" value={book_id} onChange={(e) => setBookID(e.target.value)} />
      {/* <input type="text" placeholder="Search by User ID" value={user_id} onChange={(e) => setUserID(e.target.value)} /> */}
      <button onClick={handleSearchBorrowRec}>Search Borrow Rec</button>
    </div>
  );
}

export default SearchBorrowRec;
