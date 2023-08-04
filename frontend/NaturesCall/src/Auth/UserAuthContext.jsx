import { useEffect, useContext } from "react";
import { redirect,Link, Outlet, useNavigation, useLoaderData, Form } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
//root.jsx inspired from dakota



export async function loader({ request }) {
    const response = await fetch("/api/auth/current_user");
    if (response.ok) {
      const { user } = await response.json();
      return { currentUser: user };
    }
    return { currentUser: null };
  }

  function Root(){
    const { currentUser } = useLoaderData();
    const { setCurrentUser } = useContext(AuthContext);
    const navigation = useNavigation();
  
    useEffect(() => {
      setCurrentUser(currentUser);
    }, [currentUser]);
  
  }