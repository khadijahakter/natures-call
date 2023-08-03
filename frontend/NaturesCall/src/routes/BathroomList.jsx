import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Map from "./Map";



    // Make the POST request to the backend using fetch
   

export default function BathroomList() {
  const [lat, setLat]=useState(null);
  const [long, setLong]=useState(null);
  const [displayBathrooms, setDisplayBathrooms] = useState([]);
  const [selected, setSelected] = useState(null);
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
    setDisplayBathrooms(displayBathrooms);
    console.log("display br: ",displayBathrooms)
    
    return displayBathrooms;
  }
  useEffect(() => {
    if(lat&&long){
      fetchBathrooms();

    }
    
    
  }, [lat,long]);

  return (
    <div className="flex">


      <div className="w-1/2">
        <ul className="ml-10 flex flex-col space-y-4">
          {displayBathrooms.map(bathroom => (
          <Link to = {`/bathrooms/${bathroom.id}`}>
            <li className="flex flex-col border p-4 rounded-lg">
              <h3 className="text-xl font-bold">{bathroom.name}</h3>
              <p className="text-sm text-blue-600">
                <strong className="font-medium">Rating: </strong>
                {bathroom.rating}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Address: </strong>
                {bathroom.address}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Latitude: </strong>
                {bathroom.lat}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Longitude: </strong>
                {bathroom.lng}
              </p>
              
            </li>
            </Link>
          ))}
        </ul>
      </div>

            
      <div className="w-1/2">
        <div className="border p-4"><Map displayBathrooms={displayBathrooms} lat={lat} long={long} setLat={setLat} setLong={setLong}/></div>
      </div>

    </div>
  );
}