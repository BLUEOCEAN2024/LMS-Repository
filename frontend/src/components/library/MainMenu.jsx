
import React, { useState } from 'react';
import MemberList from "./User/MemberList";
// import BookList from "./components/library/BookList";
import NavBar from "./NavBar";
import VerticalMenu from "./VerticalMenu";
// ----------------------------------------------------------------------------------
import { useLocation  } from 'react-router-dom';
// ----------------------------------------------------------------------------------

function MainMeu() {
  
  const location = useLocation();
  const isVisible = location.state?.isVisible;
  const toggleForm = () => {
    setIsRegistering(!isRegistering); // Toggle the form between Register and Login
  };

  return (
    <div>
      {/* {isVisible && <NavBar />} */}
      {isVisible && <VerticalMenu />}
    </div>
  );
}

export default MainMeu;
