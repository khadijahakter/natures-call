// import {useContext} from "react";
// import {Link, Navigate} from "react-router-dom";
// import {AuthContext} from "./AuthContext";

// export default function ProtectedRoute({children}){
//     const {currentUser} = useContext(AuthContext);
//     if(!currentUser){
//         return <Link to= "/login" />
//     }
//     return children;
// }


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}