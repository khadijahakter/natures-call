import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './Auth/AuthContext'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Map from './Map.jsx'
import './index.css'
import Navbar from './NavBar.jsx';
import BathroomList from './routes/BathroomList.jsx';
import ErrorPage from './ErrorPage.jsx'
import About from './routes/About.jsx'
import Popup from './routes/Popup.jsx'
import Signup, { action as signupAction } from './Auth/Signup.jsx'
import Login, { action as loginAction } from './Auth/Login.jsx'
import Profile, {loader as UserBathroomLoader} from './Auth/Profile.jsx'

import BathroomPage, {loader as bathroomLoader} from './BathroomPage.jsx';
import ProtectedRoute from "./Auth/ProtectedRoute";




const router = createBrowserRouter([
  {
    path: "/",

    element: <Navbar/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path : "",
        element:<BathroomList/>,
        children : [
          {
            path : "",
            element : <Map/>
          }
        ]
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/bathrooms/:id",
        element:<BathroomPage/>,
        loader: bathroomLoader
      },
      {
          path:"/profile/:id",
          element:(
            <ProtectedRoute>
          <Profile/>,
          </ProtectedRoute>
          ),
          
    
          loader: UserBathroomLoader
          
      },

    ],
  },

]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
     
//       <Route path="/" element={<NavBar />}>
       
//         <Route path="/about" element={<About />} />
//         <Route path="/" element={<App />} />
//         <Route path="/login" element={<Login />} action={loginAction} />
//       <Route path="/signup" element={<Signup />} action={signupAction} />

//       </Route>
      

//     </>
//   )
// )



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)




