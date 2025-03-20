import React, { createContext, useState, useContext } from "react";

// Create a context to store authentication state
const AuthContext = createContext();

// Custom hook to access auth state
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state (null means not logged in)

  const login = (username, password) => {
    // Simple mock logic for login (this should be replaced with a real API call)
    if (username === "admin" && password === "password") {
      setUser({ username });
      return true; // Successfully logged in
    }
    return false; // Failed to log in
  };

  const register = (username, password) => {
    // Simple mock logic for registration (should be replaced with an API call)
    // Here we are just storing the user object as an example.
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null); // Logout by clearing the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
