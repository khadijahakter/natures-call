import React from "react";
import Popup from "../routes/Popup";
import { Form, redirect } from "react-router-dom";



export async function action({ request }) {
  const formData = await request.formData();

  console.log(Object.fromEntries(formData));
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    // invalid credentials, remain on login page
    return null;
  }

  return redirect("/");
}


const Login = ({ hidePopup ,isPopup,HasAcc}) => {
  return (
    <Popup method="post" isVisible={isPopup} hidePopup={hidePopup} >
      
      <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h2 className="text-black text-center text-xl">Login</h2>

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
      <div className="text-center"><button className="" onClick={HasAcc}>Back</button></div>
      <br/>
      
      <a className="text-center">forgot password?</a>
      
      <br/>
      <p className="text-center">------------ or ------------</p>
      <br/>
      <p className="text-center">Sign in with Google</p>
    </Popup>
  );
}





export default Login;


