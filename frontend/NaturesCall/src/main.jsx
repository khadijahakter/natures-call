import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './Auth/AuthContext'
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

import AddBathroom, {action as addBrAction} from './AddBathRoom';
import EditBathroom,{ loader as loader } from './EditBathroom';

import Profile, {loader as UserBathroomLoader} from './Auth/Profile.jsx'


import ProtectedRoute from "./Auth/ProtectedRoute";




const router = createBrowserRouter([
  {
    path: "/",

    element: <Navbar />,
    errorElement: <ErrorPage />,
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
        path: "/editBathroom",
        element: <EditBathroom />,
        loader: loader,
        
      },
      {
        path: "/addBathroom",
        element: <AddBathroom />,
        action: addBrAction,
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
      },{
          path:"/profile",
          element://(
          //   <ProtectedRoute>
          <Profile/>,
        //  </ProtectedRoute>
          //),
          
    
          loader: UserBathroomLoader
          
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




