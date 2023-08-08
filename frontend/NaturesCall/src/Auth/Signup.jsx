import React from "react";
import "./auth.css";
import { Form, redirect,Link, Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthContext";


// const Signup = () => {
//   const { currentUser, signup, authError } = useContext(AuthContext);
//     if(currentUser){
//       return <Navigate to ="/" />
//     }
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       const formData = new FormData(event.target);
//       const credentials = Object.fromEntries(formData);
//       await signup(credentials);
//     };
  
//   return (
//     <>
      
//       <Form 
//         onSubmit={handleSubmit}
//       // method="post" 
      
      
//       className="selection:bg-blue-200 flex flex-col gap-2">

//       <h1 className="text-black text-center text-xl">Create Account</h1>

//       {authError && <div className="text-red-500">{authError}</div>}

//       <fieldset className="flex flex-col">
//         <label htmlFor="title">Name</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           className="border-4 focus:outline-none p-2"
//         />
//       </fieldset>
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
//       <br />
      
//       <br />
//       <br />
//       <p className="text-center">------------ or ------------</p>
//       <br />

//       <p>    <Link to={"/login"}  className="text-underline">Already have an account? Login</Link>
//       </p>
//       <Link to={"/"} className="text-underline">Back</Link>
//       </>
    
//   );
// }



// export default Signup;
//khadijah sign up
const Signup = () => {
  const { currentUser, signup, authError } = useContext(AuthContext);
    if(currentUser){
      return <Navigate to ="/" />
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const credentials = Object.fromEntries(formData);
      await signup(credentials);
    };

  return (
    <div className="min-h-screen py-40" style={{ backgroundImage: "linear-gradient(115deg, #103783, #07c8f9)" }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550617376-7e405ef1c728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')" }}>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Sign Up</h2>
            <p className="mb-4">
              Create your account. It's free and only takes a minute.
            </p>
            <Form onSubmit={handleSubmit} className="selection:bg-blue-200 flex flex-col gap-2">
              <div className="mt-5">
                <fieldset className="flex flex-col">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="First and Last Name"
                    className="border border-gray-400 py-1 px-2 w-full shadow-md"
                  />
                </fieldset>
                <fieldset className="flex flex-col mt-5">
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
                  <button type="submit" className="w-full bg-blue-600 py-3 text-center text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Sign Up</button>
                </div>
                <p className="text-center mt-4 mb-3 text-gray-600 ">Already Have an Account?</p>
                  <Link
                    to={"/login"}
                    className="w-full block bg-blue-600 py-3 text-center text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;