import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';  // Import AuthProvider
import { Navigate, useNavigate } from 'react-router-dom';

function SearchBook() {
  const navigate = useNavigate();
  const { books, setBooks  } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSearchBook = async () => {
    setError(''); // Reset error message before new request
    // console.log("title:"+title);

    try {
      // const response = await axios.get(
      //   title
      //     ? 
      //     `http://localhost:9000/api/books/getBookByTitle/${title}`
      //     : 'http://localhost:9000/api/books'
      // );

      let response;
      if (title && title.trim() !== "") {
        console.log("title:"+title);
        response = await axios.get(`http://localhost:9000/api/books/getBookByTitle/${title}`);
      } else {
        response = await axios.get('http://localhost:9000/api/books');
      }

      // console.log(response.data);
      setBooks(response.data);      
      console.log('SearchBook:' +  JSON.stringify(books, null, 2));
      // navigate("/book-management");
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again.');
    }
  };

  useEffect(() => {
    console.log('books.length:' +  books.length);
    // console.log('SearchBook:' +  JSON.stringify(books, null, 2));
    if (books.length > 0) {   // ✅ Only navigate when books are updated
      navigate("/book-management");
    }
  }, [books, navigate]);  // ✅ Runs when books change
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSearchBook}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SearchBook;
