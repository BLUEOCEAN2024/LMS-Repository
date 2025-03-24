import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateBook() {
  const { id } = useParams();  // Get the book ID from the URL
  // const navigate = useNavigate();
  
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID when the component mounts
    axios.get(`http://localhost:9000/api/books/getBookById/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: Check if all fields are filled
    if (!book.title || !book.author || !book.isbn || !book.genre || !book.year_published) {
      setError('Please fill out all fields.');
      return;
    }

    // Here, you would send the updated book data to the server
    axios.put(`http://localhost:9000/api/books/updateBook/${id}`, book)
      .then(response => {
        alert('Book updated successfully');
        // navigate('/'); // Redirect to the book list after updating
        return;
      })
      .catch(error => {
        console.error('Error updating book:', error);
        alert('There was an error updating the book.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" name="title" value={book.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author: </label>
          <input type="text" name="author" value={book.author} onChange={handleChange} />
        </div>
        <div>
          <label>ISBN: </label>
          <input type="text" name="isbn" value={book.isbn} onChange={handleChange} />
        </div>
        <div>
          <label>Genre: </label>
          <input type="text" name="genre" value={book.genre} onChange={handleChange} />
        </div>
        <div>
          <label>Year Published: </label>
          <input type="number" name="year_published" value={book.year_published} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateBook;
