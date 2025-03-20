import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookList({ books, setBooks }) {
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

  const handleBorrowBook = (id,book) => {
    axios.put(`http://localhost:9000/api/books/borrowBook/${id}`, book)
      .then(response => {
        setBooks(books.filter(book => book.book_id !== id)); // Update the books list
      })
      .catch(error => {
        console.error('Error borrowing book:', error);
        console.error('values:' +  JSON.stringify(book, null, 2));
        alert('There was an error borrowing the book.');
      });
  };

  const handleReturnBook = (id,book) => {
    axios.put(`http://localhost:9000/api/books/returnBook/${id}`, book)
      .then(response => {
        setBooks(books.filter(book => book.book_id !== id)); // Update the books list
      })
      .catch(error => {
        console.error('Error returning book:', error);
        console.error('values:' +  JSON.stringify(book, null, 2));
        alert('There was an error returning the book.');
      });
  };

  return (
    <div>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th >ID</th>
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
          {books.map(book => (
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
                <button onClick={() => handleBorrowBook(book.book_id, book)}>Borrow</button>
              </td>
              <td>
                <button onClick={() => handleReturnBook(book.book_id, book)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
