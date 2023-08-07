import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
// import axios from "axios";
import './Profile.css';

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export async function loader({ params }) {


  try {
    const [allBathroomsResponse,profileresponse ,reviewsResponse, bathroomsResponse,] = await Promise.all([
      fetch(`http://localhost:4000/bathrooms`),
      fetch(`api/userProfileData/userData`),
      fetch(`api/userProfileData/myReviews`),
      fetch(`api/userProfileData/myBathrooms`),//fetching user bathrooms (uses session id from server.js , using authnetication)
    ]);
    // const allBathroomsResponse = await fetch(`http://localhost:4000/bathrooms`);
    // const profileresponse = await   fetch(`api/userProfileData/userData`);
    // const reviewsResponse = await  fetch(`api/userProfileData/myReviews`);
    // const bathroomsResponse = await fetch(`api/userProfileData/myBathrooms`)
    const allBathrooms = await allBathroomsResponse.json();
    const profileData = await profileresponse.json();
    const reviewsData = await reviewsResponse.json();
    const userBathrooms = await bathroomsResponse.json();
   
    
  
  
    console.log("all bathrooms response call: ", allBathrooms);
    console.log("User Bathrooms:", userBathrooms);
    console.log("Reviews Data:", reviewsData);
    console.log("User Profile Data", profileData);

    // Do additional processing with the data if needed.

    return { allBathrooms, userBathrooms, reviewsData, profileData };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



export default function Profile() {
  console.log("Profile Component Loaded In main.jsx");
  const userData = useLoaderData(loader); // Use the existing loader for bathrooms
// Use the new loader for bathroom reviews

//destructure bathrooms and reviews
const {allBathrooms, userBathrooms, reviewsData, profileData} = userData;
const getBathroomNameById = (BathroomId) => {
  console.log('Review BathroomId:', BathroomId, typeof BathroomId);
  const bathroom = allBathrooms.find((bathroom) => {
    return Number(bathroom.id) === Number(BathroomId); // Added "return"
  });

  return bathroom ? bathroom.name : "Unknown Bathroom";
};



  return (

    <div>

    <h1 className="profile-header">Your Profile</h1>
    <div className = "reviewandbathroomcount">
    <p>You posted a total of {userBathrooms.length} bathrooms</p>
    <p>You posted a total of {reviewsData.length} reviews</p>
    <p> Username: {profileData.name}</p>
    <p> Email: {profileData.email} </p>
    <img src={profileData.photo}  />
    </div>
   { /*bathrooms*/}
    <div className="bathrooms-container">
       <h2 className = "bathroom-header"> Your Bathrooms </h2>
      {userBathrooms.map((bathroom)  => (
        <div key={bathroom.id} className="bathroom-item">
          <p>Name: {bathroom.name}</p>
          <p>Address: {bathroom.address}</p>
          <p>Bathroom Id: {bathroom.id}</p>
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
          <p>Bathroom Name: {getBathroomNameById(review.BathroomId)}</p>
          <p>Review Content: {review.content}</p>
          <p>Review wheelchair: {review.wheelchair}</p>
          <p>Bathroom Id: {review.BathroomId}</p>
          {/* Render other review details here */}
          <hr />
        </div>
      ))}
    </div>
    </div>
  );
}
