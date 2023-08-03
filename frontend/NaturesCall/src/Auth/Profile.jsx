import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
// loader for user bathrooms
export async function loader({ params }) {

  
  const response = await fetch(`http://localhost:4000/bathrooms/user/${params.UserId}`);

  const UserBathrooms =await response.json();
  return {UserBathrooms};

}




export default function Profile() {
  const [userBathrooms, setUserBathrooms] = useState([]);

  useEffect(() => {
    async function fetchUserBathrooms() {
      try {
   
       const userId = 5; // Replace 5 with the actual user's ID or fetch it from the logged-in user's data
        const response = await axios.get(`http://localhost:4000/bathrooms/user/${userId}`);
        const userBathroomsData = response.data;
        

        setUserBathrooms(userBathroomsData);
      } catch (error) {
        console.error("Error fetching user bathrooms data:", error);
      }
    }
    fetchUserBathrooms();
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>User Bathrooms</h2>

      {userBathrooms.map((bathroom) => (
        <div key={bathroom.id}>
          <p>Source ID: {bathroom.sourceid}</p>
          <p>Address: {bathroom.address}</p>
          <p>Latitude: {bathroom.lat}</p>
          <p>Longitude: {bathroom.lng}</p>
          <p>Name: {bathroom.name}</p>
          <p>Rating: {bathroom.rating}</p>
          <p>Content: {bathroom.content}</p>
          <p>Photo: {bathroom.photo}</p>
          {/* Render other bathroom details here */}
          <hr />
        </div>
      ))}
    </div>
  );
}
