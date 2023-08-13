import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Map from "./Map";
import RatingDisplay from "../RatingDisplay";
import './BathroomListStyles.css' ;



    // Make the POST request to the backend using fetch
   

export default function BathroomList() {
  const [lat, setLat]=useState(null);
  const [long, setLong]=useState(null);
  const [displayBathrooms, setDisplayBathrooms] = useState([]);
const [bathroomCount,setBathroomCount]=useState(null);
  const [selectedBathroom, setSelectedBathroom] = useState(null);

  async function fetchBathrooms() {
    const data={
      lat,
      long,
    }
    const response = await fetch('http://localhost:4000/nearby', {
      // http://localhost:4000/{$lat}}
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const displayBathrooms = await response.json();
    const bathroomCount = displayBathrooms.length;
    setDisplayBathrooms(displayBathrooms);
    console.log("display br: ",displayBathrooms)
      // Calculate the count of displayed bathrooms
 
  setBathroomCount(bathroomCount);
  
    return displayBathrooms;
  }


  //ckecks if lat and long were set, if they were fetches the list of bathrooms

  useEffect(() => {
    if(lat&&long){
      fetchBathrooms();
    }
  }, [lat,long]);

  return (
   
    <>
    {/* found bathroom count displayer */}
       <div className="bathroom-count-container">
        <p className="bathroom-count">
       
        {bathroomCount} Bathrooms Found
           
        </p>
      </div>
      <div className="flex h-screen">
        {!displayBathrooms.length ? (
          <div className="w-full h-full">
     
              <div> 
              <h2 className=" bg-cyan-300 text-center text-xl font-bold text-sky-100 rounded-full shadow-lg mx-auto my-2 bg-opacity-50  max-w-lg text-gray-100 tracking-widest">
                Search to find a bathroom near you
              </h2>
              </div> 
         <div className="px-6 h-full shadow-xl ">
              <Map displayBathrooms={displayBathrooms} lat={lat} long={long} setLat={setLat} setLong={setLong} />
            </div>
          </div>
        ) : (
          <>
            <div className=" overflow-scroll Bathroomlist-bg w-1/4 h-full bg-opacity-50 p-4  overflow-y-auto ">
              <ul className=" flex flex-col space-y-4 text-white">
                {displayBathrooms.map(bathroom => (
                  <div >
                    <li className="Bathroom-card flex flex-col  p-4 rounded-lg bg-opacity-30 transform transition duration-200 ease-in-out hover:scale-105">
                     
                      <div>
                      <h3 className="text-xl font-bold text-sky-900">{bathroom.name}</h3>
                      <p className="text-sm text-gray-600 py-1 ">
                              {/* <strong className="font-medium">Rating: </strong>
                              {bathroom.rating ? bathroom.rating : "Na"} */}
                              <RatingDisplay rating={bathroom.rating} />
                      </p>
                      <Link to={`/bathrooms/${bathroom.id}`} key={bathroom.id}>
  <button>View Reviews</button>
</Link>

                      </div>

                      <p className="text-sm text-gray-600">
                        <strong className="font-medium">Address: </strong>
                        {bathroom.address}
                      </p>
                <button onClick={()=>{ setSelectedBathroom(bathroom)}}>Direction</button>
                     
                    </li>
                    
                  </div>
                ))}
              </ul>
            </div>

            <div className="w-3/4 h-full ">
              <div className="">
                <Map displayBathrooms={displayBathrooms} lat={lat} long={long} setLat={setLat} setLong={setLong} selectedBathroom={selectedBathroom}/>
              </div>
            </div>
          </>
           )}  
      </div>
    </>
  );
  
}