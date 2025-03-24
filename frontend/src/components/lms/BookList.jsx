import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddBook from './AddBook';
import SearchBook from './SearchBook';
import { AuthContext } from './AuthContext';  // Import AuthProvider

// function BookList({ user_id, books, setBooks }) {
function BookList() {
  const { loginUser, books, setBooks } = useContext(AuthContext);
  const navigate = useNavigate();  // This hook allows navigation to another route
//-------Book----------------------------------------------------------------
  // const [books, setBooks] = useState([]);
  // const [searchedBook, setSearchedBook] = useState(null);
  //------------------------------------------------------------------------
  const [showAddBookSection, setShowAddBookSection] = useState(false);
  // const [showUpdateBookSection, setShowUpdateBookSection] = useState(false);
  const [showSearchBookSection, setShowSearchBookSection] = useState(false);
 
  const user_id = loginUser.user_id;

  useEffect(() => {    
    // console.log("title:"+title);
    console.error('books:' +  JSON.stringify(books, null, 2));

    if (books !== null && books !== "" ) {
      axios.get('http://localhost:9000/api/books')
        .then(response => setBooks(response.data))
        .catch(error => console.error('Error fetching books:', error));
    }
  },  []);

  // Function to fetch the latest books or borrow history
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/books'); // Update with correct endpoint
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  const handleUpdateBook = (id) => {
    // Redirect to the UpdateBook component, passing the book's ID as a URL parameter
    // console.log(id);
    navigate(`/update-book/${id}`);
    fetchBooks();
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:9000/api/books/deleteBookById/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.book_id !== id)); // Update the books list
        fetchBooks();
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        alert('There was an error deleting the book.');
      });
  };



  const handleBorrowBook = async (bookid,user_id) => {
    const response = axios.post(`http://localhost:9000/api/borrowhistory/borrowBook?bookid=${bookid}&userid=${user_id}`)
    // console.log(response.status)
     // Check if the registration was successful
     if (response.status === 200) {
      // Handle any non-200 responses here
      alert('Book is not available!');
      console.error('Borrow Error:', response.data);
    } else {
      alert('Book borrowed successfully!');
      console.log('Borrow Response:', response.data);
      // Refresh data after borrowing the book
      await fetchBooks();
    }
  };

  const handleReserveBook = async (bookid,user_id) => {
    console.log(user_id);
    const response = axios.post(`http://localhost:9000/api/borrowhistory/reserveBook?bookid=${bookid}&userid=${user_id}`)
    
     // Check if the registration was successful
     if (response.status === 200) {;
      // Handle any non-200 responses here
      alert('Book is not Reserved!');
      console.error('Reserve Error:', response.data);
    } else {
      alert('Book reserved successfully!');
      console.log('Reserve Response:', response.data);
      // Refresh data after borrowing the book
      await fetchBooks();
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <button onClick={() => setShowAddBookSection(!showAddBookSection)}>
        {showAddBookSection ? 'Hide Add Book' : 'Add a New Book'}
      </button>

      <button onClick={() => setShowSearchBookSection(!showSearchBookSection)}>
        {showSearchBookSection ? 'Hide Search Book' : 'Search for a Book'}
      </button>

      {showAddBookSection && <AddBook />}
      {/* {showUpdateBookSection && <UpdateBook setBooks={setBooks} />} */}
      {showSearchBookSection && <SearchBook />}

      {/* <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p> */}

      {/* {!searchedBook && !showSearchBookSection && !showAddBookSection && (
        <BookList user_id = {user_id} books={books} setBooks={setBooks} />
      )}

      {searchedBook && !showAddBookSection && (
        // <BookList books={[searchedBook]} setBooks={setBooks} handleDeleteBook={handleAllBook} />
        <BookList user_id = {user_id} books={[searchedBook]} setBooks={setBooks} />
      )} */}
      
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
            <th>Reserve</th>
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
                <button onClick={() => handleReserveBook(book.book_id, user_id)}>Reserve</button>
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
