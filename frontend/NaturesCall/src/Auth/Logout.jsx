import { useEffect, useContext } from "react";
import { redirect,Link, Outlet, useNavigation, useLoaderData, Form } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export async function action({ request }) {
  const response = await fetch("http://localhost:4000/logout",{
    method :"DELETE"
  });
  alert(" successfully Logged Out");
  console.log(" successfully logged out");
// return null;
return redirect("/");
}

