import React from "react";

import { Form, redirect,Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./auth.css";




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

  return (
    <>
      
      <Form 
      method="post" 
      className="selection:bg-blue-200 flex flex-col gap-2"
      onSubmit={handleSubmit}
      >


      <h2 className="text-black text-center text-xl">Login</h2>

      {authError && <div className="text-red-300">{authError}</div>}

      <fieldset className="flex flex-col">
        <label htmlFor="title">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      ></input>
    </Form> 

      
      <br/>
      
      <Link to={"/signup"}  className="text-underline">Dont have an account? Click here to sign up</Link>
      
      <br/>
      <p className="text-center">------------ Dont have an account ------------</p>
      <br/>
      <Link className="text-center" to={"/signup"}>Create Account</Link>
      
      <a className="text-center text-underline">Forgot password?</a>
     
      <br/>
      <Link to={"/"}  className="text-underline">Back</Link>
      <p className="text-center">------------ or ------------</p>
      <br/>
      <p className="text-center text-underline">Sign in with Google</p>
    </>
  );
}





export default Login;


