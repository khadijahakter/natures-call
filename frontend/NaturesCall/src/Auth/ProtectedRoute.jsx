import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAuthChecked } = useContext(AuthContext);

  if (!isAuthChecked) {
    return null;
  }

  if (!currentUser) {
    alert("you need a user to perform this action!");
    return <Navigate to="/login" />;
  }

  return children;
}