import React, { useContext } from "react";
import { Form, redirect, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaArrowLeft } from "react-icons/fa";

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
    alert("incorrect password/email ");
    return null;
  }
  alert("successfully Logged in");
  return redirect("/");
}

function Login() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    alert("user logged in from Login.jsx");
    return <Link to="/" />;
  }

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
            <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
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
