import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import Popup from "./Popup";
import { Outlet } from "react-router-dom";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";




function NavBar({ items }) {
    const [isPopup,setIsPopup]=useState(false);
  
    const showPopup = () => {
      setIsPopup(true);
    }
  
    const hidePopup = () => {
      setIsPopup(false);
      setHasAcc(true);
    }
    const [hasAcc,setHasAcc]=useState(false);

    
    const HasAcc=()=>{
        setHasAcc(!hasAcc);
        console.log("after: ",hasAcc)
    }
   
    console.log("hasAcc value: ",hasAcc)
 
  return (
    <>
    
    <div className=" text-lg flex space-x-5 content-center bg-cyan-900">
        {/* /style={({ isActive }) => ({ color: "red" })} */}
        
    <NavLink  className=" p-10 outline-black text-black" to={`/`}>Natures Call</NavLink>
    <NavLink className=" p-10 outline-black text-black" to={`/about`}>About</NavLink>
    <button className="bg-cyan-900 text-black" onClick={showPopup}>Login/Signup</button>

   <div className="z-10 ">
    {hasAcc?(<Login HasAcc={HasAcc}  isPopup={isPopup} hidePopup={hidePopup}/>):( <Signup HasAcc={HasAcc}  isPopup={isPopup} hidePopup={hidePopup}/>)}
    </div>

  
</div>
<Outlet/>

    </>
  );
  
}

export default NavBar;

