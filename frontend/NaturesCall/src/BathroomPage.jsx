import React, { useState,useEffect } from "react";
import { Link,NavLink, useLoaderData } from "react-router-dom";

import { Outlet } from "react-router-dom";

//loader for single bathroom element
//loader for reviews for a specific bathroom
export async function loader({params}){
    console.log({params});
  const response= await fetch(`http://localhost:4000/bathrooms/${params.id}`);

  const Bathroom =  await response.json();

  const reviewsResponse= await fetch(`http://localhost:4000/bathrooms/${params.id}/reviews`);

  const Reviews = await reviewsResponse.json();

  return {Bathroom, Reviews};
  
  }

//action for add a review 

export default function BathroomPage(){

const {Bathroom, Reviews} = useLoaderData();

    const {
        sourceid,
        address,
        lat,
        lng,
        name,
        rating,
        content,
        photo,
        wheelchair,
        unisex,
        emergencyCord,
        emergencyButton,
        petFriendly,
        requiresKey,
        handDryer,
        feminineProducts,
        toiletCovers,
        bidet,
        singleStall,
        multipleStall,
        changingTable,
        trashCan,
        goodFlooring,
        airFreshener,
        automatic,
        coatHook,
        brailleSign,
        hotWater,
        firstAid,
        sharpsDisposal,
      } = Bathroom;
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <img src={photo} alt={name} className="w-full h-64 object-cover mb-4 rounded" />
          <p className="text-xl mb-2">Address: {address}</p>
          <p className="text-lg mb-2">Rating: {rating}</p>
          <p className="text-lg mb-2">Content: {content}</p>
          <p className="text-lg mb-2">Wheelchair Accessible: {wheelchair ? "Yes" : "No"}</p>
          <p className="text-lg mb-2">Unisex: {unisex ? "Yes" : "No"}</p>
          <p className="text-lg mb-2">Emergency Cord: {emergencyCord ? "Yes" : "No"}</p>
          {/* Continue displaying other properties similarly */}
          <div className="mt-4">
            <NavLink
              to={`/add-review/${sourceid}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add a Review
            </NavLink>
          </div>
    
          {/* Reviews Section */}
          {Reviews.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
              <div className="space-y-4">
                {Reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-bold">{review.title}</h3>
                    <p>{review.content}</p>
                    {/* You can add more review details here */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      );

}