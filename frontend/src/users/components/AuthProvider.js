import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      setLoggedIn(true);
    }

    // Start the logout timer
    const logoutTimer = setInterval(() => {
      logout();
    }, 3600000); // Logout every 5 seconds

    return () => {
      // Clean up the logout timer
      clearInterval(logoutTimer);
    };
  }, []);

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userData");
    // Additional logout logic if needed
  };

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
