import React, { useState, useEffect } from "react";
import { Link, NavLink, useLoaderData, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import RatingDisplay from "./RatingDisplay";
import BathroomList from "./routes/BathroomList";
import { PiGenderNeuterLight, PiSyringe, PiWheelchairFill, PiCoatHangerBold, PiThermometerHotFill, PiFirstAidKit } from "react-icons/pi"
import { GrEmergency } from "react-icons/gr"
import { MdBabyChangingStation } from "react-icons/md"
import { GiButtonFinger } from 'react-icons/gi';
import { BiLike } from 'react-icons/bi'
import { MdPets } from 'react-icons/md';
import { ImKey } from 'react-icons/im';
import { MdOutlineAir } from 'react-icons/md';
import { LiaFemaleSolid, LiaToiletSolid } from 'react-icons/lia'
import { MdAirlineSeatLegroomNormal } from 'react-icons/md';
import { GiSplashyStream } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { BsFillTrash3Fill } from "react-icons/bs";
import { GiWoodBeam } from 'react-icons/gi';
import { BiSprayCan } from 'react-icons/bi';
import { MdSensors } from "react-icons/md";
import { BiBraille } from "react-icons/bi";






//loader for single bathroom element
//loader for reviews for a specific bathroom
export async function loader({ params }) {
  console.log({ params });
  const response = await fetch(`http://localhost:4000/bathrooms/${params.id}`);

  const Bathroom = await response.json();

  const reviewsResponse = await fetch(`http://localhost:4000/bathrooms/${params.id}/reviews`);

  const Reviews = await reviewsResponse.json();
  const UserResponse = await fetch(`/api/userProfileData/userData`);
  const userData = await UserResponse.json();
  const allUserResponse = await fetch('/api/userProfileData/allUsers');
  const allUsers = await allUserResponse.json();
  console.log("allUsers fetched: ", allUsers);
  return { Bathroom, Reviews, userData, allUsers };

}

//action for add a review 

export default function BathroomPage() {
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

      <div className=" Bathroomlist-bg overflow-scroll overflow-y-auto">
        <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Back To Home
        </Link>


        <div className="container mx-auto p-4 flex flex-row justify-between">

          <div className="flex flex-col  flex-grow">

            <div className="flex-col items-center justify-center bg-sky-700 bg-opacity-60 rounded" >
            <div className="flex flex-col items-center space-x-4 justify-center ">

              <h1 className="text-7xl font-bold py-7 tracking-wide">{name}</h1> 

              <div className="flex-row flex">
              <RatingDisplay className="scale-150 px-8" rating={rating} />
              <p className="text-2xl  text-gray-300"> {rating} Stars</p>
              </div>

           
            <p className="text-2xl  py-2 justify-center items-center tracking-widest"> {address}</p>

            {/* <img src={photo} alt={name} className="w-full h-64 object-cover mb-4 rounded" /> */}

            <div className="flex flex-row items-center px-2 py-4 space-x-4">

              <p className="text-lg mb-2">
                {wheelchair ?
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
                    <PiWheelchairFill size={45} color="white" />
                  </span>
                  :
                  //not there
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20 ">
                    <PiWheelchairFill size={45} />
                  </span>}
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
                  </span>}
              </p>

              <p className="text-lg mb-2">
                {emergencyCord ?
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
                    <GrEmergency size={45} />
                  </span>
                  :
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20 ">
                    <GrEmergency size={45} />
                  </span>}
              </p>

              <p className="text-lg mb-2">
                {changingTable ?
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
                    <MdBabyChangingStation size={45} />
                  </span>
                  : // not there
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20">
                    <MdBabyChangingStation size={45} />
                  </span>}
              </p>
            </div>
            </div>
            </div>

            {/* Reviews Section */}
            {Reviews.length > 0 ? (
              <>
                <div className="flex-col flex-grow items-start">

                  <div className="space-y-4 ">
                    <h2 className="text-2xl font-bold mt-8 mb-4 ">Reviews</h2>
                    <h6 className="text-2xl font-bold mt-8 mb-4">
            {Reviews.length} {Reviews.length === 1 ? 'Review' : 'Reviews'}
          </h6>
                    {Reviews.map((review) => {
                      // Find the user associated with the review
                      const reviewUser = allUsers.find(user => user.id === review.UserId);
                      console.log("reviewUser", reviewUser);
                      return (
                        <div key={review.id} className="bg-lime-950 p-4 mx-2 rounded-lg bg-opacity-70">
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

                    <div className="py-5 ">
                      <Link to
                        ={`/bathrooms/${id}/addReview`}
                        className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-teal-600 "
                      >
                        Add a Review
                      </Link>
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

          <div className="flex flex-col mx-2 px-4 py-6 space-y-4 max-w-sm w-full md:w-1/4 bg-sky-800 rounded-lg bg-opacity-60 text-white shadow-lg p-2">

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={wheelchair ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <PiWheelchairFill size={20} className={wheelchair ? "text-sky-900" : "text-white"} />
                </span>
                Wheelchair Accessible:
                <span className="font-semibold flex-shrink-0">
                  {wheelchair ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{wheelchair}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>
              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={unisex ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <PiGenderNeuterLight size={20} className={unisex ? "text-sky-900" : "text-white"} />
                </span>
                Unisex:
                <span className="font-semibold flex-shrink-0">
                  {unisex ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{unisex}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={emergencyCord ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <GrEmergency size={20} className={emergencyCord ? "text-sky-900" : "text-white"} />
                </span>
                Emergency cord:
                <span className="font-semibold flex-shrink-0">
                  {emergencyCord ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{emergencyCord}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={changingTable ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <MdBabyChangingStation size={20} className={changingTable ? "text-sky-900" : "text-white"} />
                </span>
                Changing Table:
                <span className="font-semibold flex-shrink-0">
                  {changingTable ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{changingTable}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={emergencyButton ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <GiButtonFinger size={20} className={emergencyButton ? "text-sky-900" : "text-white"} />
                </span>
                Emergency Button:
                <span className="font-semibold flex-shrink-0">
                  {emergencyButton ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{emergencyButton}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={petFriendly ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <MdPets size={20} className={petFriendly ? "text-sky-900" : "text-white"} />
                </span>
                Pet Friendly:
                <span className="font-semibold flex-shrink-0">
                  {petFriendly ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{petFriendly}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={requiresKey ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <ImKey size={20} className={requiresKey ? "text-sky-900" : "text-white"} />
                </span>
                Requires Key:
                <span className="font-semibold flex-shrink-0">
                  {requiresKey ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{requiresKey}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={handDryer ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <MdOutlineAir size={20} className={handDryer ? "text-sky-900" : "text-white"} />
                </span>
                Hand Dryer:
                <span className="font-semibold flex-shrink-0">
                  {handDryer ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{handDryer}</span>
                      <BiLike className="ml-1" />
                    </span>)
                    : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={feminineProducts ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <LiaFemaleSolid size={20} className={feminineProducts ? "text-sky-900" : "text-white"} />
                </span>
                Feminine Products:
                <span className="font-semibold flex-shrink-0">
                  {feminineProducts ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{feminineProducts}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={toiletCovers ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <MdAirlineSeatLegroomNormal size={20} className={toiletCovers ? "text-sky-900" : "text-white"} />
                </span>
                Toilet Covers:
                <span className="font-semibold flex-shrink-0">
                  {toiletCovers ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{toiletCovers}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={bidet ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <GiSplashyStream size={20} className={bidet ? "text-sky-900" : "text-white"} />
                </span>
                Bidet:
                <span className="font-semibold flex-shrink-0">
                  {bidet ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{bidet}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={singleStall ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <LiaToiletSolid size={20} className={singleStall ? "text-sky-900" : "text-white"} />
                </span>
                Single Stall:
                <span className="font-semibold flex-shrink-0">
                  {singleStall ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{singleStall}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={multipleStall ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <HiUserGroup size={20} className={multipleStall ? "text-sky-900" : "text-white"} />
                </span>
                Multiple Stalls:
                <span className="font-semibold flex-shrink-0">
                  {multipleStall ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{multipleStall}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={trashCan ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <BsFillTrash3Fill size={20} className={trashCan ? "text-sky-900" : "text-white"} />
                </span>
                Trash Can:
                <span className="font-semibold flex-shrink-0">
                  {trashCan ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{trashCan}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={goodFlooring ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <GiWoodBeam size={20} className={goodFlooring ? "text-sky-900" : "text-white"}/>
   </span>
   Good Flooring:
   <span className="font-semibold flex-shrink-0">
        {goodFlooring ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{goodFlooring}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
      </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={airFreshener ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <BiSprayCan size={20} className={airFreshener ? "text-sky-900" : "text-white"}/>
   </span>
   Air Freshener:
   <span className="font-semibold flex-shrink-0">
        {airFreshener ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{airFreshener}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
      </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={automatic ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <MdSensors size={20} className={automatic ? "text-sky-900" : "text-white"}/>
   </span>
   Automatic:
   <span className="font-semibold flex-shrink-0">
        {automatic ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{automatic}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
      </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={coatHook ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <PiCoatHangerBold size={20} className={coatHook ? "text-sky-900" : "text-white"}/>
   </span>
   Coat Hook:
   <span className="font-semibold flex-shrink-0">
        {coatHook ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{coatHook}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
   </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={brailleSign ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <BiBraille size={20} className={brailleSign ? "text-sky-900" : "text-white"}/>
   </span>
   Braille Sign:
   <span className="font-semibold flex-shrink-0">
        {brailleSign ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{brailleSign}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
      </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
    <span className={hotWater ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
        <PiThermometerHotFill size={20} className={hotWater ? "text-sky-900" : "text-white"} />
    </span>
    Hot Water:
    <span className="font-semibold flex-shrink-0">
        {hotWater ? ( 
            <span className="flex items-center">
                Yes 
                <span className="ml-1">{hotWater}</span>
                <BiLike className="ml-1"/>
            </span>) : "No"}
    </span>
</p>

<p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
   <span className={firstAid ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
       <PiFirstAidKit size={20} className={firstAid ? "text-sky-900" : "text-white"}/>
   </span>
   First Aid Kit:
   <span className="font-semibold flex-shrink-0">
        {firstAid ? ( 
          <span className="flex items-center">
            Yes 
            <span className="ml-1">{firstAid}</span>
            <BiLike className="ml-1"/>
          </span>) : "No"}
      </span>
</p>



              <p className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                <span className={sharpsDisposal ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                  <PiSyringe size={20} className={sharpsDisposal ? "text-sky-900" : "text-white"} />
                </span>
                Sharps Disposal:
                <span className="font-semibold flex-shrink-0">
                  {sharpsDisposal ? (
                    <span className="flex items-center">
                      Yes
                      <span className="ml-1">{sharpsDisposal}</span>
                      <BiLike className="ml-1" />
                    </span>) : "No"}
                </span>
              </p>

          </div>



        </div>

      </div>
    </>


  );

}