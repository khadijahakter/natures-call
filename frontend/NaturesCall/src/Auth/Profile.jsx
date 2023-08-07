import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import './Profile.css';

import { useContext } from "react";
import { AuthContext } from "./AuthContext";
// loader for user bathrooms
// export async function loader({ params }) {

//   const UserId = 5;
//   //const response = await fetch(`http://localhost:4000/bathrooms/user/${params.UserId}`);
//   // const response = await fetch(`http://localhost:4000/bathrooms/user/5`);
//   // const UserBathrooms =await response.json();
//   // return UserBathrooms;
// const thing = await Promise.all(
//   fetch(`http://localhost:4000/bathrooms/user/5`),
//   fetch(`http://localhost:4000/5/reviews`)
// )
//  console.log(thing.response.json())
//  return thing
// }
// export async function ReviewsLoader({ params }) {
//   const response = await fetch(`http://localhost:4000/5/reviews`);
//   const UserReviews = await response.json();
//   return UserReviews;
// }
export async function loader({ params }) {
 // const UserId = 5;
const UserId = 2;
  try {
    const [allBathroomsResponse, bathroomsResponse, reviewsResponse, profileresponse] = await Promise.all([
      fetch(`http://localhost:4000/bathrooms`),
      //fetch(`http://localhost:4000/bathrooms/user/${UserId}`),
      fetch(`http://localhost:4000/myBathrooms`),//fetching user bathrooms (uses session id from server.js , using authnetication)
      fetch(`http://localhost:4000/myReviews`),
      fetch(`http://localhost:4000/profile/userData`)
    ]);
    const allBathrooms = await allBathroomsResponse.json();
    const userBathrooms = await bathroomsResponse.json();
    const reviewsData = await reviewsResponse.json();
    const profileData = await profileresponse.json();
    console.log("all bathrooms: ", allBathrooms);
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
// const userBathrooms = [
//   { id: 1, name: "Bathroom A" },
//   { id: 2, name: "Bathroom B" },
//   { id: 3, name: "Bathroom C" },
// ];

// const reviewsDatas = [
//   { id: 101, BathroomId: 1, content: "Review 1" },
//   { id: 102, BathroomId: 3, content: "Review 2" },
//   { id: 103, BathroomId: 2, content: "Review 3" },
// ];

// console.log(getBathroomNameById(1, userBathrooms)); // Output: "Bathroom A"
// console.log(getBathroomNameById(3, userBathrooms)); // Output: "Bathroom C"
// console.log(getBathroomNameById(5, userBathrooms)); // Output: "Unknown Bathroom"

debugger
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
