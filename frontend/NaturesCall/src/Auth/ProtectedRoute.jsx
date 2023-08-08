import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAuthChecked } = useContext(AuthContext);

  if (!isAuthChecked) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}