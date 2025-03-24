import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBorrowRec from './SearchBorrowRec';
import { AuthContext } from './AuthContext';  // Import AuthProvider

// function BorrowList({ borrowRecs, setBorrowRecs }) {
function BorrowList() {
  const { loginUser, borrowRecs, setBorrowRecs } = useContext(AuthContext);
  // const navigate = useNavigate();  // This hook allows navigation to another route
  //-------Borrow History----------------------------------------------------------------
  // const [borrowRecs, setBorrowRecs] = useState([]);
  // const [searchedBorrowRec, setSearchedBorrowRec] = useState(null);
  //------------------------------------------------------------------------
  const [showSearchBorrowRecSection, setShowSearchBorrowRecSection] = useState(false);  
  
  const user_id = loginUser.user_id;

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
    console.log(bookid + ','+ user_id);
    const response = axios.post(`http://localhost:9000/api/borrowhistory/releaseReservedBook?bookid=${bookid}&userid=${user_id}`)
    
     // Check if the registration was successful
     if (response.status === 200) {
      alert('Book released successfully!');
      console.log('Release Response:', response.status);
    } else {
      // Handle any non-200 responses here
      alert('Book is not released!');
      console.error('Release Error:', response.data);
    }
    
    handleAllBorrowRec();
  };

  const handleBorrowReservedBook = (bookid,user_id) => {
    console.log(bookid + ','+ user_id);
    const response = axios.post(`http://localhost:9000/api/borrowhistory/borrowReservedBook?bookid=${bookid}&userid=${user_id}`)
    
    console.log("handleBorrowReservedBook :", JSON.stringify(response.data , null, 2));
     // Check if the registration was successful
     if (response.status === 200) {
      alert('Reserved Book borrowed successfully!');
      console.log('Reserved Book Response:', response.data);
    } else {
      // Handle any non-200 responses here
      alert('Book is not borrowed!');
      console.error('Reserved Book Error:', response.data);
    }
    handleAllBorrowRec();
  };

  // const handleReturnBook = async (bookid,user_id) => {
  //   console.log(bookid + ','+ user_id);
  //   const response = await  axios.post(`http://localhost:9000/api/borrowhistory/returnBook?bookid=${bookid}&userid=${user_id}`)
  //   console.log(response.status)
  //    // Check if the registration was successful
  //    if (response.status === 200) {
  //     alert('Book returned successfully!');
  //     console.log('Return Response:', response.data);
  //     // Refresh data after borrowing the book
  //   } else {
  //     // Handle any non-200 responses here
  //     alert('Book is not available!');
  //     console.error('Return Error:', response.data);
  //   }
  //   handleAllBorrowRec();
  // };

  const handleReturnBook = async (bookid, user_id) => {
    try {
        console.log(`Returning book with ID: ${bookid}, User ID: ${user_id}`);

        // Await the API call
        const response = await axios.post(`http://localhost:9000/api/borrowhistory/returnBook?bookid=${bookid}&userid=${user_id}`);
        
        if (response.status === 200) {
            alert('Book returned successfully!');
            console.log('Return Response:', response.data);
            // Refresh the borrow records
            handleAllBorrowRec();
        }
    } catch (error) {
        // Handle errors properly
        if (error.response) {
            // Server responded with a status other than 200
            console.error('Return Error:', error.response.data);
            alert(error.response.data || 'Book return failed.');
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
            alert('No response from server. Please try again.');
        } else {
            // Other errors
            console.error('Error:', error.message);
            alert('An unexpected error occurred.');
        }
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
