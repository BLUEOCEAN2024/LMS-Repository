
import './App.css'

import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch books on load
  useEffect(() => {
    axios.get('http://localhost:9000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Add a new book
  const handleAddBook = () => {
    const newBook = { id: Date.now(), title, author }; // Temporary ID
    axios.post('http://localhost:9000/api/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setTitle('');
        setAuthor('');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div>
      <h1>Library Management System</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
