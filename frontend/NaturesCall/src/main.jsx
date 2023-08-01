import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import App from './App.jsx'
import NavBar from './routes/NavBar.jsx'
import './index.css'


import ErrorPage from './ErrorPage.jsx'
import About from './routes/About.jsx'
import Popup from './routes/Popup.jsx'
import Signup, { action as signupAction } from './Auth/Signup.jsx'
import Login, { action as loginAction } from './Auth/Login.jsx'





// const router = createBrowserRouter([
//   {
//     path: "/",

//     element: <NavBar/>,
//     errorElement:<ErrorPage/>,
//     children:[
//       {
//         index :true,
//         element:<App/>
//       },
//       {
//         path: "login",
//         element: <Login />,
//         action: loginAction,
//       },
//       {
//         path: "signup",
//         element: <Signup />,
//         action: signupAction,
//       },

//       {
//         path:"/about",
//         element:<About/>
//       },

//     ],
//   },

// ]);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     
      <Route path="/" element={<NavBar />}>
       
        <Route path="/about" element={<About />} />
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/signup" element={<Signup />} action={signupAction} />

      </Route>
      

    </>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)




