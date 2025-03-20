import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookList({ user_id, books, setBooks }) {
  const navigate = useNavigate();  // This hook allows navigation to another route

  const handleUpdateBook = (id) => {
    // Redirect to the UpdateBook component, passing the book's ID as a URL parameter
    navigate(`/update-book/${id}`);
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:9000/api/books/deleteBookById/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.book_id !== id)); // Update the books list
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        alert('There was an error deleting the book.');
      });
  };

  const handleReturnBook = (bookid,userid) => {
    const response = axios.post(`http://localhost:9000/api/borrowhistory/returnBook?bookid=${bookid}&userid=${userid}`)
    
     // Check if the registration was successful
     if (response.status === 200) {
      alert('Book returned successfully!');
      console.log('Return Response:', response.data);
    } else {
      // Handle any non-200 responses here
      alert('Book is not available!');
      console.error('Return Error:', response.data);
    }
  };

  const handleBorrowBook = (bookid,userid) => {
    const response = axios.post(`http://localhost:9000/api/borrowhistory/borrowBook?bookid=${bookid}&userid=${userid}`)
    
     // Check if the registration was successful
     if (response.status === 200) {
      alert('Book borrowed successfully!');
      console.log('Borrow Response:', response.data);
    } else {
      // Handle any non-200 responses here
      alert('Book is not available!');
      console.error('Borrow Error:', response.data);
    }
  };

  return (
    <div>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Year Published</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Borrow</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          
        {books && books.length > 0 ? (
          books.map(book => (
            <tr key={book.book_id}>
              <td align="left" >{book.book_id}</td>
              <td align="left">{book.title}</td>
              <td align="left">{book.author}</td>
              <td align="left">{book.isbn}</td>
              <td align="left">{book.genre}</td>
              <td align="center">{book.year_published}</td>
              <td align="center">{book.status}</td>
              <td>
                <button onClick={() => handleUpdateBook(book.book_id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleBorrowBook(book.book_id, user_id)}>Borrow</button>
              </td>
              <td>
                <button onClick={() => handleReturnBook(book.book_id, user_id)}>Return</button>
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

export default BookList;
