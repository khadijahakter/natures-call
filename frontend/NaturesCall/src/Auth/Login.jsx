import React from "react";

import { Form, redirect,Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./auth.css";
import { FaArrowLeft } from "react-icons/fa";



function Login(){
  const{currentUser, login, authError} = useContext(AuthContext);
 // console.log("current user: (from Login Function): ", {currentUser});
 if (currentUser) {
  return <Navigate to="/" />;
}

   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    await login(credentials);
  }

//   return (
//     <>
      
//       <Form 
//       method="post" 
//       className="selection:bg-blue-200 flex flex-col gap-2"
//       onSubmit={handleSubmit}
//       >


//       <h2 className="text-black text-center text-xl">Login</h2>

//       {authError && <div className="text-red-300">{authError}</div>}

//       <fieldset className="flex flex-col">
//         <label htmlFor="title">Email</label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           className="border-4 focus:outline-none p-2"
//         />
//       </fieldset>
//       <fieldset className="flex flex-col">
//         <label htmlFor="company">Password</label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           className="border-4 focus:outline-none p-2"
//         />
//       </fieldset>
//       <input
//         className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
//         type="submit"
//       ></input>
//     </Form> 

      
//       <br/>
      
//       <Link to={"/signup"}  className="text-underline">Dont have an account? Click here to sign up</Link>
      
//       <br/>
//       <p className="text-center">------------ Dont have an account ------------</p>
//       <br/>
//       <Link className="text-center" to={"/signup"}>Create Account</Link>
      
//       <a className="text-center text-underline">Forgot password?</a>
     
//       <br/>
//       <Link to={"/"}  className="text-underline">Back</Link>
//       <p className="text-center">------------ or ------------</p>
//       <br/>
//       <p className="text-center text-underline">Sign in with Google</p>
//     </>
//   );
// }
return (
  <div className="min-h-screen py-40" style={{ backgroundImage: "linear-gradient(115deg, #103783, #07c8f9)" }}>
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1672192951477-8e74f2af3369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHJlc3Ryb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60')" }}>
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          <h2 className="text-3xl mb-4">Login</h2>
          <p className="mb-4">
            Login to your account.
          </p>
          <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2"  onSubmit={handleSubmit}>
            <div className="mt-5">
              <fieldset className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full shadow-md"
                />
              </fieldset>
              <fieldset className="flex flex-col mt-5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full shadow-md"
                />
              </fieldset>
              <div className="mt-5 mb-3">
                <button type="submit" className="w-full bg-blue-600 py-3 text-center text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Login</button>
              </div>
              <p className="text-center mt-4 mb-3 text-gray-600 ">Don't have an Account?</p>
              <Link
                to={"/signup"}
                className="w-full block bg-blue-600 py-3 text-center text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Sign Up
              </Link>
              <p className="text-center mt-4 text-underline cursor-pointer">Forgot password?</p>
            </div>
            <Link to={"/"} style={{ display: 'flex', alignItems: 'center' }}>
              <FaArrowLeft style={{ marginRight: '8px' }} /> Back
            </Link>
          </Form>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;