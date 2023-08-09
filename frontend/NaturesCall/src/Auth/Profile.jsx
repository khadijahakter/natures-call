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


const [newProfilePhoto, setNewProfilePhoto] = useState(""); // State to manage new profile photo URL

const handleProfilePhotoUpdate = async () => {
  try {
    // Send the updated profile photo URL to your backend API for user data update
    const response = await fetch(`api/userProfileData/user/profilepic`, {
      method: "PATCH", // Use the appropriate HTTP method
      headers: {
        "Content-Type": "application/json",
        // Add any necessary headers, like authorization token
      },
      body: JSON.stringify({
        userId: profileData.user.id, // Replace with actual user ID
        newProfilePhoto: newProfilePhoto,
      }),
    });

    if (response.ok) {
      // Assuming the backend returns updated user data
      const updatedProfileData = await response.json();

      // Update the profileData state with the updated user data
      // This will cause a re-render and display the new photo
      // You might need to modify the actual structure of the profileData object
      // based on the response structure from your API
      // For example: setProfileData(updatedProfileData);
    } else {
      console.error("Failed to update profile photo");
    }
  } catch (error) {
    console.error("Error updating profile photo:", error);
  }
};
  return (

    <div>
  <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        Back To Home
      </Link>
    <h1 className="profile-header">Welcome Back, {profileData.user.name}</h1>
    {/* show profile photo */}
   
      {/* show profile photo if it's not null */}
      {profileData.photo && (
        <div className="profile-photo">
          <img src={profileData.photo} alt="Profile Pic" />
        </div>
      )}
      <div className="profile-container">
      {/* Profile Photo Section */}
      <div className="profile-photo-section">
        <h2 className = "profile-photo-title">Update Profile Photo</h2>
        <input
          type="text"
          placeholder="Enter Image URL"
          value={newProfilePhoto}
          onChange={(e) => setNewProfilePhoto(e.target.value)}
        />
        <button onClick={handleProfilePhotoUpdate}>Update Photo</button>
      </div>
      </div>


    <div className = "reviewandbathroomcount">
    <p >Username: {profileData.user.name}</p>
  <p >Email: {profileData.user.email}</p>
    <p>You posted a total of {userBathrooms.length} bathroom(s)</p>
    <p>You posted a total of {reviewsData.length} review(s)</p>
   

    {/* <img src={profileData.photo}  /> */}
    </div>
    <div className="bathrooms-reviews-container">
   { /*bathrooms*/}
    <div className="bathrooms-container">
       <h2 className = "bathroom-header"> Your Bathrooms </h2>
      {userBathrooms.map((bathroom)  => (
        <div key={bathroom.id} className="bathroom-item">
          <p>Name: {bathroom.name}</p>
          <p>Address: {bathroom.address}</p>
          <p>Bathroom ID: {bathroom.id}</p>
          <p>Rating: {bathroom.rating} </p>
          <p>Content: {bathroom.content}</p>
          {/* <p>lat: {bathroom.lat}</p>
          <p>lng: {bathroom.lng}</p> */}
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
          <p>Bathroom ID: {review.BathroomId}</p>
          <p>Time Created: {review.createdAt}</p>
          {/* Render other review details here */}
          <hr />
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}
