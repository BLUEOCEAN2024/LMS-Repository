import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';  // Import AuthProvider

function AddBook() {  
  const { loginUser, setBooks } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [error, setError] = useState('');

  const handleAddBook = () => {
    const newBook = { title, author, isbn, genre, year_published: yearPublished, created_by:  loginUser.user_id };
    
    axios.post('http://localhost:9000/api/books/addBook', newBook)
      .then(response => {
        setBooks(prevBooks => [...prevBooks, response.data]);
        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setYearPublished('');
        setCreatedBy('');
        setError('');
      })
      // .catch(error => {
      //   setError('There was an error adding the book.');
      // })
      ;
  };

  return (
    <div>
      <h3>Add a New Book</h3>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="number" placeholder="Year Published" value={yearPublished} onChange={(e) => setYearPublished(e.target.value)} />
      {/* <input type="text" placeholder="Created By" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} /> */}
      <button onClick={handleAddBook}>Add Book</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddBook;
