import React, { useState,useEffect } from "react";
import { Link,NavLink, useLoaderData, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import RatingDisplay from "./RatingDisplay";
import BathroomList from "./routes/BathroomList";
import {GrWheelchair} from "react-icons/gr"
import {PiGenderNeuterLight} from "react-icons/pi"
import {GrEmergency} from "react-icons/gr"
import {MdBabyChangingStation} from "react-icons/md"

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

      const { id } = useParams();
      return (
<>

        <div className="container mx-auto p-4">

          <div className="flex flex-col items-center ">
        <div className="flex items-center space-x-4 justify-center "> {/* flex makes it inline, items-center vertically aligns the items, space-x-4 adds horizontal spacing */}
          <h1 className="text-7xl font-bold py-9 tracking-wide">{name}</h1>
          <RatingDisplay className="scale-150 px-8" rating={rating}/> {/* Assuming you can pass className to RatingDisplay */}
          <p className="text-2xl mb-2 text-gray-300"> {rating} Stars</p>
        </div>
          <p className="text-2xl mb-2 justify-center tracking-widest"> {address}</p>

          {/* <img src={photo} alt={name} className="w-full h-64 object-cover mb-4 rounded" /> */}
       
     <div className="flex flex-row items-center px-2 py-4 space-x-4">
   
    <p className="text-lg mb-2">
      Wheelchair Accessible: 
      {wheelchair ? 
        <span className="bg-sky-900 rounded-full p-2 inline-flex items-center justify-center">
          <GrWheelchair size={45} />
        </span> 
        : 
        "No"}
    </p>
  
  <p className="text-lg mb-2">
    Unisex: 
    {unisex ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <PiGenderNeuterLight size={45} />
      </span> 
      : 
      "No"}
  </p>
  
  <p className="text-lg mb-2">
    Emergency cord: 
    {emergencyCord ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <GrEmergency size={45} />
      </span> 
      : 
      <span className="bg-sky-800 rounded-full p-2 inline-flex items-center justify-center opacity-40 ">
      <GrEmergency size={45} />
    </span> }
  </p>

 <p className="text-lg mb-2">
    Changing Table: 
    {changingTable ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <MdBabyChangingStation size={45} />
      </span> 
      : 
      "No"}
  </p>

  </div>
  <div className="flex flex-col items-center px-2 py-4 space-x-4">
   
    <p className="text-lg mb-2">
      Wheelchair Accessible: 
      {wheelchair ? 
        <span className="bg-sky-900 rounded-full p-2 inline-flex items-center justify-center">
          <GrWheelchair size={15} />
        </span> 
        : 
        "No"}
    </p>
  
  <p className="text-lg mb-2">
    Unisex: 
    {unisex ? 
      <span className="
       rounded-full p-2 inline-flex items-center justify-center">
        <PiGenderNeuterLight size={25} />
      </span> 
      : 
      "No"}
  </p>
  
  <p className="text-lg mb-2">
    Emergency cord: 
    {emergencyCord ? 
      <span className="rounded-full p-2 inline-flex items-center justify-center">
        <GrEmergency size={25} />
      </span> 
      : 
      <span className=" rounded-full p-2 inline-flex items-center justify-center  ">
      <GrEmergency size={25} />  No current votes
    </span> }
  </p>

 <p className="text-lg mb-2">
    Changing Table: 
    {changingTable ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <MdBabyChangingStation size={45} />
      </span> 
      : 
      <span className=" rounded-full p-2 inline-flex items-center justify-center">
      <MdBabyChangingStation size={25} />
    </span> }
  </p>

  </div>
</div>  

         
          
          <div className="mt-4">
            <Link to
             ={`/bathrooms/${id}/addReview`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add a Review
            </Link>
          </div>
    
          {/* Reviews Section */}
          {Reviews.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
              <div className="space-y-4">

                {Reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                   <RatingDisplay
                    rating = {review.rating}/>
                  <h3 className="text-xl font-bold">{review.rating}</h3>
                    <h3 className="text-xl font-bold">{review.title}</h3>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        
        </>
      );

}