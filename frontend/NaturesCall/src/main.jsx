import React from 'react'
import ReactDOM from 'react-dom/client'
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<App/>
      },
      {
        path:"/about",
        element:<About/>
      }

    ],
  },
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
