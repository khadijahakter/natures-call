import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
    console.log("Protected Route component initialized");
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    console.log("current user does not exists");
    return <Navigate to="/login" />;
   
  }
  if(currentUser){
    console.log("current user exists");
  }

  return children;
}