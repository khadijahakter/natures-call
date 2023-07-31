import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import NavBar from './routes/NavBar.jsx'
import './index.css'

import{
  createBrowserRouter,
  RouterProvider,
  Route,

}from "react-router-dom"
import ErrorPage from './ErrorPage.jsx'
import About from './routes/About.jsx'
import Popup from './routes/Popup.jsx'
import Signup,{ action as signupAction } from './Auth/Signup.jsx'
import Login , { action as loginAction } from './Auth/Login.jsx'





const router = createBrowserRouter([
  {
    path: "/",

    element: <NavBar/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index :true,
        element:<App/>
      },
      {
        index: true,
        element: <Login />,
        action: loginAction,
      },
      {
        index: true,
        element: <Signup />,
        action: signupAction,
      },
     
      {
        path:"/about",
        element:<About/>
      },

    ],
  },
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)




