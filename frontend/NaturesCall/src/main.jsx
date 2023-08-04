import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './Auth/AuthContext';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import './index.css'
import Navbar from './NavBar.jsx';
import BathroomList from './routes/BathroomList.jsx';
import ErrorPage from './ErrorPage.jsx'
import About from './routes/About.jsx'
import Popup from './routes/Popup.jsx'
import Signup, { action as signupAction } from './Auth/Signup.jsx'
import Login, { action as loginAction } from './Auth/Login.jsx'
import BathroomPage, {loader as bathroomLoader} from './BathroomPage.jsx';
import AddReviewForm, {action as AddReview} from './AddReviewForm.jsx';
import Profile, {loader as UserBathroomLoader} from './Auth/Profile.jsx';
import {action as logoutAction} from './Auth/Logout.jsx';
import { AuthContext } from "./Auth/AuthContext";

import ProtectedRoute from "./Auth/ProtectedRoute";
import{loader as NavBarLoader} from "./NavBar.jsx";



const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    loader: NavBarLoader,
    // action: logoutAction,
    children: [
      {
        path: "",
        element: <BathroomList />,

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
        path: "/about",
        element: <About />
      },
      {
        path: "/bathrooms/:id",
        element: <BathroomPage />,
        loader: bathroomLoader
      },
      {
        path:"/bathrooms/:id/addReview",
        element:<AddReviewForm/>,
        action : AddReview
      },
      {
        index: true,
          path:"/profile",
          element:(
           <ProtectedRoute>
          <Profile/>,
         </ProtectedRoute>
        ),        
           loader: UserBathroomLoader
      },
      {
      
      
        path: "/logout",
        // element:(
        // <ProtectedRoute>
   
        loader: logoutAction,
        // </ProtectedRoute>
        // ),
      },

    ],
  },

]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)




