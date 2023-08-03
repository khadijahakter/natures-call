import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import './Profile.css';
// loader for user bathrooms
export async function loader({ params }) {

  const UserId = 5;
  //const response = await fetch(`http://localhost:4000/bathrooms/user/${params.UserId}`);
  const response = await fetch(`http://localhost:4000/bathrooms/user/5`);
  const UserBathrooms =await response.json();
  return UserBathrooms;

}
export async function ReviewLoader({ params }) {
  //ask Chad on how t get userId 
  //const response = await fetch(`http://localhost:4000/${params.UserId}/reviews`);
  const response = await fetch(`http://localhost:4000/5/reviews`);
  const UserReviews = await response.json();
  return UserReviews ;
}



export default function Profile() {
  const userBathrooms = useLoaderData(loader); // Use the existing loader for bathrooms
  const reviewsData = useLoaderData(ReviewLoader); // Use the new loader for bathroom reviews


   

  return (

    <div>

    <h1 className="profile-header">Your Profile</h1>
   { /*bathrooms*/}
    <div className="bathrooms-container">
       <h2 className = "bathroom-header"> Your Bathrooms </h2>
      {userBathrooms.map((bathroom) => (
        <div key={bathroom.id} className="bathroom-item">
          <p>Source ID: {bathroom.sourceid}</p>
          <p>Address: {bathroom.address}</p>
          <p>Latitude: {bathroom.lat}</p>
          <p>Longitude: {bathroom.lng}</p>
          <p>Name: {bathroom.name}</p>
          <p>Rating: {bathroom.rating}</p>
          <p>Content: {bathroom.content}</p>
          <img src={bathroom.photo} alt={`Photo of ${bathroom.name}`} />
          {/* Render other bathroom details here */}
          <hr />
        </div>
      ))}
    </div>
        {/*reviews*/}
        <div className="reviews-container">
       <h2 className = "review-header"> Your Reviews </h2>
      {reviewsData.map((review) => (
        <div key={review.id} className="review-item">
          <p>Review Content: {review.content}</p>
        
          {/* Render other review details here */}
          <hr />
        </div>
      ))}
    </div>
    </div>
  );
}
