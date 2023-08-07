import React from "react";
import "./auth.css";
import { Form, redirect,Link, Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthContext";


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
    <>
      
      <Form 
        onSubmit={handleSubmit}
      // method="post" 
      
      
      className="selection:bg-blue-200 flex flex-col gap-2">

      <h1 className="text-black text-center text-xl">Create Account</h1>

      {authError && <div className="text-red-500">{authError}</div>}

      <fieldset className="flex flex-col">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
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
      <br />
      
      <br />
      <br />
      <p className="text-center">------------ or ------------</p>
      <br />

      <p>    <Link to={"/login"}  className="text-underline">Already have an account? Login</Link>
      </p>
      <Link to={"/"} className="text-underline">Back</Link>
      </>
    
  );
}



export default Signup;
