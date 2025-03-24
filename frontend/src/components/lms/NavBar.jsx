// NavBar.js
import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import AuthProvider

const NavBar = () => {
  
  const { loginUser  } = useContext(AuthContext);
  const role = loginUser.role;
  
  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          {role === 'LIBRARIAN' && (
            <Link to="/user-management" style={styles.link}>User Management</Link>
          )}
          {/* <Link to="/user-management" style={styles.link}>User Management</Link> */}
        </li>
        <li style={styles.navItem}>
          <Link to="/book-management" style={styles.link}>Book Management</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/lending-management" style={styles.link}>Lending Management</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/logout" style={styles.link}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#333',
    padding: '10px 20px',    
    width: '500px', // Set the height of the navbar (increased area)
    display: 'flex', // Use flexbox to align the items in the navbar
    justifyContent: 'space-between', // Space out the items (left and right aligned)
    alignItems: 'center', // Vertically center the items in the navbar
    color: '#fff', // Text color (white) for links or items in the navbar
    fontSize: '16px', // Font size for the text inside the navbar
    fontFamily: 'Arial, sans-serif', // Font family for the navbar text
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: adds shadow to make navbar stand out
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    width: 'auto',// You can specify a fixed width if needed
  padding: '5px', // Optional, if you want to add space around the text
  display: 'inline-block',  // Ensures the width/height can apply correctly
  },
};

export default NavBar;
