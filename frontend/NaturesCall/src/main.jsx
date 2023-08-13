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
import Signup from './Auth/Signup.jsx'
import Login from './Auth/Login.jsx'
import BathroomPage, {loader as bathroomLoader} from './BathroomPage.jsx';
import AddReviewForm, {action as AddReview} from './AddReviewForm.jsx';
import AddBathroom, {action as addBrAction} from './AddBathroom';
import EditBathroom,{ loader as loader } from './EditBathroom';
import EditReview, {loader as editReviewLoader} from './EditReview';

import Profile, {loader as UserBathroomLoader} from './Auth/Profile.jsx';

import {action as logoutAction} from './Auth/Logout.jsx';




import ProtectedRoute from "./Auth/ProtectedRoute";
//import{loader as NavBarLoader} from "./NavBar.jsx";



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
   
      },
      {
        path: "signup",
        element: <Signup />,
 
      },
      {
        path: "/about",
        element:
          
        <About />,
       
       
      },
      {
        path: "/editBathroom/:editId",
        element: <EditBathroom />,
        loader: loader,
        
      },
      {
        path: "/editReview/:editId",
        element: <EditReview/>,
        loader: editReviewLoader,
      },
      {
        path: "/addBathroom",
        element: (<ProtectedRoute>
          <AddBathroom />
           </ProtectedRoute>
        ),
        action: addBrAction,
      },
      {
        path: "/bathrooms/:id",
        element: <BathroomPage />,
        loader: bathroomLoader
      },
      {
        path:"/bathrooms/:id/addReview",
        element:(
        <ProtectedRoute>
        <AddReviewForm/>
        </ProtectedRoute>
        ),
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
      

    ],
  },

]);




ReactDOM.createRoot(document.getElementById('root')).render(
  
<AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

)




