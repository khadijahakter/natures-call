import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";

// loader for user bathrooms
export async function loader({ params }) {
  console.log({ params });
  const response = await fetch(`http://localhost:4000/bathrooms/user/${params.id}`);
  const userBathrooms = await response.json();

  return { userBathrooms };
}

export default function Profile() {
  const { userBathrooms } = useLoaderData();

  if (!userBathrooms) {
    // Handle the case where userBathrooms is null or undefined (e.g., it's still loading)
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>User Bathrooms</h2>
    
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
      
    </div>
  );
}
