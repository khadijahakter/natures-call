import React from "react";
import Popup from "../routes/Popup";
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const response = await fetch("http://localhost:4000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // invalid submission, remain on signup page
    return null;
  }

  return redirect("/");
}

const Signup = ({ hidePopup }) => {
  return (
    <Popup isVisible={true} hidePopup={hidePopup}>
      
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
      <div className="text-center">
        <button className="" onClick={hidePopup}>
          Sign Up
        </button>
      </div>
      <br />
      <br />
      <p className="text-center">------------ or ------------</p>
      <br />

      <p>
        Already have an account?
        <button onClick={hidePopup}>Login</button>
      </p>
    </Popup>
  );
}



export default Signup;
