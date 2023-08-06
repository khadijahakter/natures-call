import React, { useRef, useContext } from "react";
import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export let formRef;  // Make formRef exportable so action function can access it

export async function action(formElement) {
  const formData = new FormData(formElement);

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
    alert("Invalid submission!");
    return null;
  }
  alert("Successfully signed up!!");
  return redirect("/");
}

const Signup = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const formRef = useRef(null);  // Define the ref here inside the Signup component

  if (currentUser) {
    return <Link to="/" />
  }
  /* #6bdfdb */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    if (formRef.current) {
      await action(formRef.current);  // Call action with formRef.current directly
    }
    navigate("/");
  }

  return (
    <div className="min-h-screen py-40" style={{ backgroundImage: "linear-gradient(115deg, #103783, #07c8f9)" }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550617376-7e405ef1c728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')" }}>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Sign Up</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute.
            </p>
            <Form ref={formRef} method="post" onSubmit={handleSubmit} className="selection:bg-blue-200 flex flex-col gap-2">
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