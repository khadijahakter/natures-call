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
  const UserResponse = await fetch(`/api/userProfileData/userData`);
  const userData = await UserResponse.json();
  const allUserResponse = await fetch('/api/userProfileData/allUsers');
  const allUsers = await allUserResponse.json();
  console.log("allUsers fetched: ", allUsers);
  return {Bathroom, Reviews, userData, allUsers};
  
  }

//action for add a review 

export default function BathroomPage(){
  const { Bathroom, Reviews, userData, allUsers } = useLoaderData();

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
<Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        Back To Home
      </Link>
<div className=" overflow-scroll overflow-y-auto">
        <div className="container mx-auto p-4 ">

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
      {wheelchair ? 
        <span className="bg-sky-900 rounded-full p-2 inline-flex items-center justify-center">
          <GrWheelchair size={45} />
        </span> 
        :
         //not there
        <span className="bg-sky-800 rounded-full p-2 inline-flex items-center justify-center opacity-20 ">
        <GrWheelchair size={45} />
      </span> }
    </p>
  
  <p className="text-lg mb-2">
    {unisex ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <PiGenderNeuterLight size={45} />
      </span> 
      : 
      //not there 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20">
        <PiGenderNeuterLight size={45} />
      </span> }
  </p>
  
  <p className="text-lg mb-2">
    {emergencyCord ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <GrEmergency size={45} />
      </span> 
      : 
      <span className="bg-sky-800 rounded-full p-2 inline-flex items-center justify-center opacity-20 ">
      <GrEmergency size={45} />
    </span> }
  </p>

 <p className="text-lg mb-2">
    {changingTable ? 
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
        <MdBabyChangingStation size={45} />
      </span> 
      : // not there
      <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20">
      <MdBabyChangingStation size={45} />
    </span> }
  </p>
  </div>
</div>  

          {/* Reviews Section */}
          {Reviews.length > 0 ? (
            <>
            <div className="flex -row">

                <div className="space-y-4 w-3/4">
              <h2 className="text-2xl font-bold mt-8 mb-4 ">Reviews</h2>
      
              {Reviews.map((review) => {
              // Find the user associated with the review
              const reviewUser = allUsers.find(user => user.id === review.UserId);
              console.log("reviewUser", reviewUser);
              return (
                <div key={review.id} className="bg-gray-900 p-4 mx-2 rounded-lg bg-opacity-70">
                  <div className="flex items-center space-x-4"> {/* Display user photo and other info */}
                    <img src={reviewUser.photo} alt={`${reviewUser.name}'s Profile Pic`} className="w-8 h-8 rounded-full" />
                    <h3 className="text-xl font-bold">{reviewUser.name}</h3>
                  </div>
                  <RatingDisplay rating={review.rating} />
                  <h3 className="text-xl font-bold">{review.title}</h3>
                  <p>{review.content}</p>
                </div>
              );
            })}

          <div className= "py-5 ">
            <Link to
             ={`/bathrooms/${id}/addReview`}
              className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-teal-600 "
            >
              Add a Review
            </Link>
          </div>

              </div>

  <div className="flex flex-col mx-2 px-4 py-6 space-y-4 w-1/4 bg-sky-900 rounded-lg bg-opacity-20 text-white shadow-lg">
   <div className="bathroom-veil p-2">
   <p className="text-lg mb-2 flex items-center space-x-2">
     <span className="bg-white rounded-full p-2 inline-flex items-center justify-center">
       <GrWheelchair size={25} className="text-sky-900" />
     </span> 
     Wheelchair Accessible: 
     <span className="font-semibold">{wheelchair ? 
     ("Yes " + wheelchair +" votes"
     ) : "No"}</span>
   </p>
 
 <p className="text-lg mb-2 flex items-center space-x-2">
   <span className="bg-white rounded-full p-2 inline-flex items-center justify-center">
     <PiGenderNeuterLight size={25} className="text-sky-900"/>
   </span> 
   Unisex: 
   <span className="font-semibold">{unisex ? "Yes" : "No"}</span>
 </p>
 
 <p className="text-lg mb-2 flex items-center space-x-2">
  
   <span className={emergencyCord ? "bg-white rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 rounded-full p-2 inline-flex items-center justify-center"}>
     <GrEmergency size={25} className={emergencyCord ? "text-sky-900" : "text-white"}/>
   </span> 
   Emergency cord: 
   <span className="font-semibold">{emergencyCord ? "Yes" : "No"}</span>
 </p>

<p className="text-lg mb-2 flex items-center space-x-2">

   <span className={changingTable ? "bg-white rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 rounded-full p-2 inline-flex items-center justify-center"}>
     <MdBabyChangingStation size={changingTable ? 45 : 25} className={changingTable ? "text-sky-900" : "text-white"}/>
   </span> 
   Changing Table: 
   <span className="font-semibold">{changingTable ? "Yes" : "No"}</span>
 </p>
</div>
 </div>

 </div>
            </>
          ) : (
            <>
            <p className="p-2 my-4">No reviews available.</p>
            <Link to
            ={`/bathrooms/${id}/addReview`}
             className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-teal-600 m-4"
           >
             Add a Review
           </Link>
           </>
          )}
        </div>
   
        </div>
        </>
      );

}