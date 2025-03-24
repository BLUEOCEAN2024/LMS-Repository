import { createContext, useState } from 'react';

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null);
  const [borrowRecs, setBorrowRecs] = useState([]);
  const [searchedBorrowRec, setSearchedBorrowRec] = useState(null);  
  const [searchUsers, setSearchUsers] = useState([]);  // Make sure `users` is always an array
  const [users, setUsers] = useState([]);  // Make sure `users` is always an array
  const [loginUser, setLoginUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLibrarian, setIsLibrarian] = useState(null);

  const setRole = (role) => {   
    if(role == 'LIBRARIAN'){
      setIsLibrarian(true);
    }else{
      setIsLibrarian(false)
    }
  };

  // const login = (userId) => {    
  // const login = (loginUser) => {
  //   setloginUser(loginUser);
    // setLoginId(userId);
    // setIsAuthenticated(true);
  // };

  // const logout = () => {
  //   setloginUser(null);
    // setLoginId(null);
    // setIsAuthenticated(false);
  // };

  // const userList = (users) => {
  //   setUsers(users);
  // };

  return (
    // <AuthContext.Provider value={{ loginId, isAuthenticated, login, logout }}>
    <AuthContext.Provider value={{ isLibrarian, setIsLibrarian, books, setBooks, borrowRecs, setBorrowRecs, searchUsers, setSearchUsers, users, setUsers, loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
