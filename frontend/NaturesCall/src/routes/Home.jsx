import React, { useState,useEffect } from "react";
import { Link,NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";




//change name to bathroom list
function Home() {
   
  const [displayBathrooms,setDisplayBathrooms]=useState([]);
  useEffect(()=>{

    async function fetchBathrooms(){
      
    const response= await fetch("http://localhost:4000/bathrooms");
    
    const displayBathrooms =await response.json();
    setDisplayBathrooms(displayBathrooms);
     
    return {displayBathrooms};
    
    }
    
    fetchBathrooms();
    
    },[])
  
 
  return (
    <>
    
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

export default Home;

