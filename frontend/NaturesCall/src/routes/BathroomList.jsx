import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function BathroomList() {
  const [displayBathrooms, setDisplayBathrooms] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    async function fetchBathrooms() {
      const response = await fetch("http://localhost:4000/bathrooms");
      const displayBathrooms = await response.json();
      setDisplayBathrooms(displayBathrooms);
      return displayBathrooms;
    }
    fetchBathrooms();
  }, []);

  return (
    <div className="flex">


      <div className="w-1/2">
        <ul className="ml-10 flex flex-col space-y-4">
          {displayBathrooms.map(bathroom => (
          <Link to = {`/bathrooms/${bathroom.id}`} >
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
            </li>
            </Link>
          ))}
        </ul>
      </div>

            
      <div className="w-1/2">
        <div className="border p-4"><Outlet/></div>
      </div>

    </div>
  );
}