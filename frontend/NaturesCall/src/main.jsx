import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Navbar from './NavBar.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children : [
      // {
      //   path: "/login",
      //   element: <Login/>,
      // },
      // {
      //   path: "/signup",
      //   element: <Signup/>,
      // },
      
    ],
    
  },
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);