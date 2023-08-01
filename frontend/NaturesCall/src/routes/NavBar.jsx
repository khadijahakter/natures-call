import React, { useState,useEffect } from "react";
import { Link,NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";





function NavBar() {
   
  const [displayBathrooms,setDisplayBathrooms]=useState([]);
  useEffect(()=>{

    async function fetchBathrooms(){
      
    const response= await fetch("http://localhost:4000/bathrooms");
    
    const displayBathrooms =await response.json();
    setDisplayBathrooms(displayBathrooms);
     
     
    
    
    return displayBathrooms;
    
    }
    
    fetchBathrooms();
    
    },[])
  
 
  return (
    <>
    
    <div className=" text-lg flex space-x-5 content-center bg-cyan-900">
        {/* /style={({ isActive }) => ({ color: "red" })} */}
        
    <NavLink  className=" p-10 outline-black text-black" to={`/`}>Natures Call</NavLink>
    <NavLink className=" p-10 outline-black text-black" to={`/about`}>About</NavLink>
    <NavLink className="bg-cyan-900 text-black" to={`/signup`} >Login/Signup</NavLink>

  

  
</div>
<ul className='ml-10'>
        {displayBathrooms.map(bathroom => (
          <li >
          
            <h3 >{bathroom.name}</h3>
        
            
            <p><strong>rating: </strong>{bathroom.rating}</p>
            <p><strong>Address: </strong> {bathroom.address}</p>
            
            </li>
        
        ))}
    </ul>
   <Outlet/> 

    </>
  );
  
}

export default NavBar;

