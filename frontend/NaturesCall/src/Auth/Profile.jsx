import React from "react";
import { Link, NavLink, useLoaderData, } from "react-router-dom";
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
      fetch(`/api/userProfileData/userData`),
      fetch(`/api/userProfileData/myReviews`),
      fetch(`/api/userProfileData/myBathrooms`),//fetching user bathrooms (uses session id from server.js , using authnetication)
    ]);

    const allBathrooms = await allBathroomsResponse.json();
    const profileData = await profileresponse.json();
    const reviewsData = await reviewsResponse.json();
    const userBathrooms = await bathroomsResponse.json();
   
    
  
  
    console.log("all bathrooms response call: ", allBathrooms);
    console.log("User Bathrooms:", userBathrooms);
    console.log("Reviews Data:", reviewsData);
    console.log("User Profile Data", profileData);

    // Do additional processing with the data if needed.

    return { allBathrooms,  profileData, reviewsData, userBathrooms };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



export default function Profile() {
  console.log("Profile Component Loaded In main.jsx");

const { allBathrooms,  profileData, reviewsData, userBathrooms } = useLoaderData();

const getBathroomNameById = (BathroomId) => {
  console.log('Review BathroomId:', BathroomId, typeof BathroomId);
  const bathroom = allBathrooms.find((bathroom) => {
    return Number(bathroom.id) === Number(BathroomId); // Added "return"
  });

  return bathroom ? bathroom.name : "Unknown Bathroom";
};



  return (

    <div>
  <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        Back To Home
      </Link>
    <h1 className="profile-header">Welcome Back, {profileData.user.name}</h1>
    
    <div className = "reviewandbathroomcount">
    <p >Username: {profileData.user.name}</p>
  <p >Email: {profileData.user.email}</p>
    <p>You posted a total of {userBathrooms.length} bathrooms</p>
    <p>You posted a total of {reviewsData.length} reviews</p>
   

    <img src={profileData.photo}  />
    </div>
    <div className="bathrooms-reviews-container">
   { /*bathrooms*/}
    <div className="bathrooms-container">
       <h2 className = "bathroom-header"> Your Bathrooms </h2>
      {userBathrooms.map((bathroom)  => (
        <div key={bathroom.id} className="bathroom-item">
          <p>Name: {bathroom.name}</p>
          <p>Address: {bathroom.address}</p>
          <p>Bathroom Id: {bathroom.id}</p>
          <p>Rating: {bathroom.rating} </p>
          <p>Content: {bathroom.content}</p>
          <p>lat: {bathroom.lat}</p>
          <p>lng: {bathroom.lng}</p>
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
          {/* <p>Review wheelchair: {review.wheelchair}</p> */}
          <p>Bathroom Id: {review.BathroomId}</p>
          {/* Render other review details here */}
          <hr />
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}
