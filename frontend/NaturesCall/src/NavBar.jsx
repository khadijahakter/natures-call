import { NavLink, Outlet, Link } from "react-router-dom";
import React from "react";
import logo from './images/Natures_Call_Logo.png';

export default function Navbar() {
  return (
    <>
      <nav style={{ backgroundColor: '#33709D' }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <h1 className="block py-2 pl-3 pr-4 text-white rounded hover:bg-33709D md:hover:bg-transparent md:border-0 md:hover:text-FFA726 md:p-0 dark:text-white md:dark:hover:text-FFA726 dark:hover:bg-33709D dark:hover:text-white md:dark:hover:bg-transparent">Nature's Call</h1>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-33709D focus:outline-none focus:ring-2 focus:ring-FFA726 dark:text-gray-400 dark:hover:bg-33709D dark:focus:ring-212121" aria-controls="navbar-default" aria-expanded="false"
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-FFA726 rounded-lg bg-F5F5F5 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-F5F5F5 dark:bg-33709D md:dark:bg-transparent dark:border-212121"
            >
              <li>
                <Link to="/about"
                  className="block py-2 pl-3 pr-4 text-212121 rounded hover:bg-33709D md:hover:bg-transparent md:border-0 md:hover:text-FFA726 md:p-0 dark:text-white md:dark:hover:text-FFA726 dark:hover:bg-33709D dark:hover:text-white md:dark:hover:bg-transparent"
                >About</Link>
              </li>
              <li>
                <Link to="/login"
                  className="block py-2 pl-3 pr-4 text-212121 rounded hover:bg-33709D md:hover:bg-transparent md:border-0 md:hover:text-FFA726 md:p-0 dark:text-white md:dark:hover:text-FFA726 dark:hover:bg-33709D dark:hover:text-white md:dark:hover:bg-transparent"
                >Login/Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
