import { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

// AuthProvider.js
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Set isAuthChecked to false at the beginning while we check
    const checkAuthStatus = async () => {
      setIsAuthChecked(false);

      try {
        // Fetch the current user from API
        const response = await fetch("/api/auth/current_user");
        const { user } = await response.json();

        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      }

      setIsAuthChecked(true);
    }

    checkAuthStatus();
  }, [])

  const login = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(credentials)
      })

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  }

  const signup = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  const logout = async () => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE"
      });

      if (response.ok) {
        setCurrentUser(null);
        setAuthError(null);
      } else {
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      isAuthChecked,
      authError,
      signup,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider