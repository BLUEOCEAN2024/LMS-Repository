import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BorrowList({ borrowRecs, setBorrowRecs }) {
  const navigate = useNavigate();  // This hook allows navigation to another route
      
  const handleAllBorrowRec = () => {
      axios.get('http://localhost:9000/api/borrowhistory')
      .then(response => setBorrowRecs(response.data))
      .catch(error => console.error('Error fetching books:', error));
  };
  // setBorrowRecs(borrowRecs);
  console.log('BorrowList:' || borrowRecs);

  return (
    <div>Result</div>
  //   <div>
  //     <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
  //       <thead>
  //       <tr>
  //           <th>ID</th>
  //           <th>Book ID</th>
  //           <th>User ID</th>
  //           <th>Borrow Date</th>
  //           <th>Return Date</th>
  //           <th>Status</th>
  //       </tr>
  //       </thead>
  //       <tbody>
  //       {borrowRecs && borrowRecs.length > 0 ? (
  //           borrowRecs.map(borrowRec => (
  //           <tr key={borrowRec.hist_id}> {/* Ensure hist_id is unique */}
  //               <td align="left">{borrowRec.hist_id}</td>
  //               <td align="left">{borrowRec.book_id}</td>
  //               <td align="left">{borrowRec.user_id}</td>
  //               <td align="left">{borrowRec.borrow_dt}</td>
  //               <td align="left">{borrowRec.return_dt}</td>
  //               <td align="center">{borrowRec.status}</td>
  //           </tr>
  //           ))
  //       ) : (
  //           <tr><td colSpan="6" align="center">No records found</td></tr>
  //       )}
  //       </tbody>
  //     </table>
  //   </div>
  );
}

export default BorrowList;
