import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import Popup from "./Popup";
import { Outlet } from "react-router-dom";




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
        setHasAcc(false);
        console.log("after: ",hasAcc)
    }
   
 
  return (
    <>
    
    <div className=" text-lg flex space-x-5 content-center bg-cyan-900">
        {/* /style={({ isActive }) => ({ color: "red" })} */}
        
    <NavLink  className=" p-10 outline-black text-black" to={`/`}>Natures Call</NavLink>
    <NavLink className=" p-10 outline-black text-black" to={`/about`}>About</NavLink>
    <button className="bg-cyan-900 text-black" onClick={showPopup}>Login/Signup</button>

   <div className="z-10 ">
    {hasAcc?(
    <Popup
      isVisible={isPopup}
      hidePopup={hidePopup}
    >
      <h2 className="text-center font-black mt-0"><strong>Sign Up</strong></h2>
      <form id="poster-form">
       <input type="text" id="form-quote" placeholder="Create Email"/>
       <br/>
       <br/>
       <input type="text" id="form-quote" placeholder="Create User Name"/>
       <br/>
       <br/>
       <input type="text" id="form-quote" placeholder="Create Password"/>
    
      </form>
      <br/>
     <div className="text-center"> <button className="" onClick={hidePopup}>Sign Up</button></div>
      <br/>
      <br/>
      <p className="text-center">------------ or ------------</p>
      <br/>
      
      <p>Already have an account?<button onClick={HasAcc} > Login</button></p>
      

    </Popup>

        ):(
          <Popup
          isVisible={isPopup}
          hidePopup={hidePopup}
        >
          <h2 className="text-center font-black mt-0"><strong>Login</strong></h2>
          <form id="poster-form">
           <input type="text" id="form-quote" placeholder=" Email"/>
           <br/>
           <br/>
          
           
           <input type="text" id="form-quote" placeholder=" Password"/>
        
          </form>
         
         
          <br/>
          <div className="text-center"><button className="" onClick={hidePopup}>Login</button></div>
          <br/>
         
          
          <a className="text-center">forgot password?</a>
      
      <br/>
          <p className="text-center">------------ or ------------</p>
          <br/>
          <p className="text-center">Sign in with Google</p>
          
    
        </Popup>
        )
    }
    </div>

  
</div>
<Outlet/>

    </>
  );
  
}

export default NavBar;

