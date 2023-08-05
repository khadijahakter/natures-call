import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthContext";

export default function ProtectedRoute({children}){
    const {currentUser} = useContext(AuthContext);
    if(!currentUser){
        return <Link to= "/login" />
    }
    return children;
}