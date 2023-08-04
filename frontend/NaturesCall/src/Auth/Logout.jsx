import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigation, useLoaderData, Form } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export async function action({ request }) {
  const response = await fetch("http://localhost:4000/logout",{
    method :"DELETE"
  });
  alert(" successfully Logged Out");
  return null;
}