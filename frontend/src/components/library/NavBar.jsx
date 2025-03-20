// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/user-management" style={styles.link}>User Management</Link>
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
  },
};

export default NavBar;
