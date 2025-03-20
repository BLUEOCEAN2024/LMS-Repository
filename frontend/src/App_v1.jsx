import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [books, setBooks] = useState([]);
  //-----------------------------------------------------
  const [id, setID] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdDt, setCreatedDt] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [updatedDt, setUpdatedDt] = useState('');
  //-----------------------------------------------------
  const [searchedBook, setSearchedBook] = useState(null);  
  const [deletedBook, setDeletedBook] = useState(null);
  //-----------------------------------------------------
  const [error, setError] = useState('');
  //-----------------------------------------------------
  const [showAddBookSection, setShowAddBookSection] = useState(false); // New state for showing Add Book section
  const [showUpdateBookSection, setShowUpdateBookSection] = useState(false); // New state for showing Update Book section
  const [showSearchBookSection, setShowSearchBookSection] = useState(false); // New state for showing Search Book section
  const [showAllBookSection, setShowAllBookSection] = useState(false); // New state for showing All Book section
  //-----------------------------------------------------
  // Fetch books on load
  useEffect(() => {
    axios.get('http://localhost:9000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Fetch books on load
  const handleAllBook =() => {
    axios.get('http://localhost:9000/api/books')
      .then(response => {
        setBooks(response.data);
        setShowAddBookSection(!showAddBookSection);
        setShowSearchBookSection(!showSearchBookSection);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  // Add a new book
  const handleAddBook = () => {
    const newBook = { 
      book_id: null,
      title, 
      author, 
      isbn, 
      genre, 
      year_published: yearPublished, 
      created_by: createdBy, 
      created_dt: null, 
    };

    axios.post('http://localhost:9000/api/books/addBook', newBook)
      .then(response => {
        setBooks([...books, response.data]);

        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setYearPublished('');
        setCreatedBy('');
        setCreatedDt('');
        setUpdatedBy('');
        setUpdatedDt('');
        setShowAddBookSection(false); // Hide Add Book section after submitting
        setError('');

        handleAllBook();
      })
      .catch(error => {
        console.error('Error adding book:', error);
        console.error('values:' +  JSON.stringify(newBook, null, 2));
        setError('There was an error adding the book.');
      });
  };

  // Search for a book by its title
  const handleSearchBook = () => {
    if (!title) {
      setSearchedBook(null);
      return;
    }
    axios.get(`http://localhost:9000/api/books/getBookByTitle/${title}`)
      .then(response => setSearchedBook(response.data))
      .catch(error => console.error('Error fetching book:', error));
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:9000/api/books/deleteBookById/${id}`)    
      .then(response => {
        setBooks(books.filter(book => book.book_id !== id)); // Update the books list
        setDeletedBook(response.data); // Optionally store deleted book data
        setError('');

        handleAllBook();
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        setError('There was an error deleting the book.');
      });
  };

  const handleUpdateBook = () => {
    const currBook = { 
      book_id,
      title, 
      author, 
      isbn, 
      genre, 
      yearPublished, 
      createdBy, 
      createdDt,
      updatedBy,
      updatedDt, 
    };

    axios.post('http://localhost:9000/api/books/updateBook', currBook)
      .then(response => {
        setBooks([...books, response.data]);

        setID('');
        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setYearPublished('');
        setCreatedBy('');
        setCreatedDt('');
        setUpdatedBy('');
        setUpdatedDt('');
        setShowUpdateBookSection(false); // Hide Update Book section after submitting
        setError('');

        handleAllBook();
      })
      .catch(error => {
        console.error('Error updating book:', error);
        console.error('values:' +  JSON.stringify(currBook, null, 2));
        setError('There was an error updating the book.');
      });
  };
  
  return (
    <div>
      <h1>Library Management System</h1>

      {/* Button to toggle the "Add Book" section */}
      {/* <button onClick={() => handleAllBook}>Display All</button> */}

      {/* Button to toggle the "Add Book" section */}
      <button onClick={() => setShowAddBookSection(!showAddBookSection)}>
        {showAddBookSection ? 'Hide Add Book' : 'Add a New Book'}
      </button>

      {/* Button to toggle the "Add Book" section */}
      <button onClick={() => setShowSearchBookSection(!showSearchBookSection)}>
        {showSearchBookSection ? 'Hide Search Book' : 'Search for a Book'}
      </button>
    
      {/* Conditionally render the Add Book section */}
      {showAddBookSection && (
        <div>
          <h3>Add a New Book</h3>
          <input type="text"
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
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={(e) => setYearPublished(e.target.value)}
          />
          <input
            type="text"
            placeholder="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}


      {/* Conditionally render the Add Book section */}
      {showUpdateBookSection && (
        <div>
          <h3>Add a New Book</h3>
          <input type="text"
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
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={(e) => setYearPublished(e.target.value)}
          />
          <input
            type="text"
            placeholder="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Conditionally render the Search Book section */}
      {showSearchBookSection && (
        <div>
          <input
            type="text"
            placeholder="Search by Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleSearchBook}>Search Book</button>
        </div>
      )}

      <p></p>

      {/* Show Searched Book in Table */}
      {searchedBook && !showAddBookSection && (
        <table border="1">
          <thead>
            <tr>
              <th hidden="true">ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Year Published</th>
              <th>Update</th> {/* New column for the update button */}
              <th>Delete</th> {/* New column for the delete button */}
            </tr>
          </thead>
          <tbody>
            <tr key={searchedBook.book_id}>
              <td align="left" hidden="true">{searchedBook.book_id}</td>
              <td align="left">{searchedBook.title}</td>
              <td align="left">{searchedBook.author}</td>
              <td align="left">{searchedBook.isbn}</td>
              <td align="left">{searchedBook.genre}</td>
              <td align="center">{searchedBook.year_published}</td>
              <td>
                <button onClick={() => setShowUpdateBookSection(!showUpdateBookSection)}>
                  {showUpdateBookSection ? 'Hide Update Book' : 'Update a Book'}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteBook(searchedBook.book_id)}>Delete</button> {/* Delete button */}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <p></p>

      {/* Show Books List in Table */}
      {!searchedBook && !showSearchBookSection && !showAddBookSection && (
        <table border="1">
          <thead>
            <tr>
              <th hidden="true">ID</th>
              {/* <th>ID</th> */}
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Year Published</th>
              <th>Update</th> {/* New column for the update button */}
              <th>Delete</th> {/* New column for the delete button */}
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.book_id}>
                <td align="left" hidden="true">{book.book_id}</td>
                {/* <td align="left">{book.book_id}</td> */}
                <td align="left">{book.title}</td>
                <td align="left">{book.author}</td>
                <td align="left">{book.isbn}</td>
                <td align="left">{book.genre}</td>
                <td align="center">{book.year_published}</td>
                <td>
                  <button onClick={() => handleUpdateBook(book.book_id)}>Update</button> {/* Update button */}
                </td>
                <td>
                  <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
