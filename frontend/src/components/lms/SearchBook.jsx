import React, { useState } from 'react';
import axios from 'axios';

function SearchBook({ setBooks }) {
  const [title, setTitle] = useState('');

  const handleSearchBook = () => {
    if (!title) {
      setBooks(null);
      return;
    }
    axios.get(`http://localhost:9000/api/books/getBookByTitle/${title}`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching book:', error));
  };

  return (
    <div>
      <input type="text" placeholder="Search by Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSearchBook}>Search Book</button>
    </div>
  );
}

export default SearchBook;
