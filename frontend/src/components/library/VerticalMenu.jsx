import { Link, useNavigate } from 'react-router-dom';

const VerticalMenu = () => {
  
  const navigate = useNavigate();

  const styles = {
    navBar: {
      width: '200px', // Adjust width as needed
      backgroundColor: '#333', // Optional: Change background color for visibility
      padding: '10px',
    },
    navList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: '15px', // Space between items
    },
    link: {
      textDecoration: 'none',
      color: 'white', // Link color, change as needed
      fontSize: '16px', // Font size, adjust as needed
      display: 'block', // Ensure link is block-level for vertical alignment
      padding: '10px',
      borderRadius: '4px', // Optional: rounded corners for links
      transition: 'background-color 0.3s',
    },
    linkHover: {
      backgroundColor: '#575757', // Hover effect color
    }
  };

  const handleUserManagementClick = () => {
    // You can also pass state when using navigate()
    navigate('/user-management', { state: { isVisible: true } });
  };

  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
      <li style={styles.navItem}>
          {/* Use an onClick handler for custom navigation */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor behavior
              handleUserManagementClick();
            }}
            style={styles.link}
          >
            User Management
          </a>
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

export default VerticalMenu;
