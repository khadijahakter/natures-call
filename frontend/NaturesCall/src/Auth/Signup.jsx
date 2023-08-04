import React from "react";
import "./auth.css";
import { Form, redirect,Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthContext";

export async function action({ request }) {
    const formData = await request.formData();
  
    // Convert formData to a JSON-serializable object
    const formDataObj = {};
    for (const [name, value] of formData.entries()) {
      formDataObj[name] = value;
    }
  
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj), // Use the JSON-serializable object
    });
  
    if (!response.ok) {
      // Invalid submission, remain on the signup page
      alert("something went wrong");
      return null;
    }
    alert("successfully Signed up");
    return redirect("/");
  }

const Signup = () => {
    const{currentUser} = useContext(AuthContext);
    if(currentUser){
      return <Link to ="/" />
    }
   
  return (
    <>
      
      <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-black text-center text-xl">Create Account</h1>

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
