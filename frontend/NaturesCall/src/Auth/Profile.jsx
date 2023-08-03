import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import './Profile.css';
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
  const UserId = 5;

  try {
    const [bathroomsResponse, reviewsResponse] = await Promise.all([
      fetch(`http://localhost:4000/bathrooms/user/${UserId}`),
      fetch(`http://localhost:4000/${UserId}/reviews`)
    ]);

    const userBathrooms = await bathroomsResponse.json();
    const reviewsData = await reviewsResponse.json();

    console.log("User Bathrooms:", userBathrooms);
    console.log("Reviews Data:", reviewsData);

    // Do additional processing with the data if needed.

    return { userBathrooms, reviewsData };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



export default function Profile() {
  const userData = useLoaderData(loader); // Use the existing loader for bathrooms
// Use the new loader for bathroom reviews

//destructure bathrooms and reviews
const {userBathrooms, reviewsData} = userData;
const getBathroomNameById = (BathroomId) => {
  const bathroom = userBathrooms.find((bathroom) => bathroom.id === BathroomId);
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


  return (

    <div>

    <h1 className="profile-header">Your Profile</h1>
    <div className = "reviewandbathroomcount">
    <p>You posted a total of {userBathrooms.length} bathrooms</p>
    <p>You posted a total of {reviewsData.length} reviews</p>
    </div>
   { /*bathrooms*/}
    <div className="bathrooms-container">
       <h2 className = "bathroom-header"> Your Bathrooms </h2>
      {userBathrooms.map((bathroom) => (
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
