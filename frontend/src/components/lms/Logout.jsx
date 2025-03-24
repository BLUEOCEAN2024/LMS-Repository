import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ handleLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout handler and redirect to the login page
    handleLogout();
    navigate('/'); // Navigate back to the login page (root)
  }, [handleLogout, navigate]);

  return null; // This component doesn't need to render anything
}

export default Logout;
