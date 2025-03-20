import React from 'react';

function BookRow({ book, handleDeleteBook }) {

  return (
    <tr key={book.book_id}>
      <td hidden="true">{book.book_id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.isbn}</td>
      <td>{book.genre}</td>
      <td>{book.year_published}</td>
      <td>
        <button>Update</button>
      </td>
      <td>
        <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default BookRow;
