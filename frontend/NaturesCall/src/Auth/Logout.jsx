import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Logout() {
    const { setIsLoggedIn } = useContext(AuthContext);
  
    const handleLogout = () => {
      // Perform logout actions here (e.g., clearing tokens, etc.)
      // For now, just set isLoggedIn to false to simulate logout
      setIsLoggedIn(false);
    };
  
    return (
      <>
        <h2 className="text-black text-center text-xl">Logout</h2>
        <p className="text-center">
          Are you sure you want to logout?
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
        <br />
        <Link to="/">Back to Home</Link>
      </>
    );
  }
  