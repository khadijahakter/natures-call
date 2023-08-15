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
  const [showFullList, setShowFullList] = useState(false);
  const columnSize = showFullList ? 'h-auto' : 'h-auto';

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

  const amenities = [
    {
        name: 'Wheelchair Accessible',
        icon: <PiWheelchairFill size={25} className={wheelchair ? "text-stone-500" : "text-stone-100"} />,
        value: wheelchair
    },
    {
        name: 'Unisex',
        icon: <PiGenderNeuterLight size={25} className={unisex ? "text-stone-500" : "text-stone-100"}/>,
        value: unisex
    },
    {
        name: 'Emergency cord',
        icon: <GrEmergency size={25} className={emergencyCord ? "text-stone-500" : "text-stone-100"}/>,
        value: emergencyCord
    },
    {
      name: 'Changing Table',
      icon: <MdBabyChangingStation size={25} className={changingTable ? "text-stone-500" : "text-stone-100"} />,
      value: changingTable
  },
  {
      name: 'Emergency Button',
      icon: <GiButtonFinger size={25} className={emergencyButton ? "text-stone-500" : "text-stone-100"} />,
      value: emergencyButton
  }, 
  {
    name: 'Pet Friendly',
    icon: <MdPets size={25} className={petFriendly ? "text-stone-500" : "text-stone-100"} />,
    value: petFriendly
},
{
    name: 'Requires Key',
    icon: <ImKey size={25} className={requiresKey ? "text-stone-500" : "text-stone-100"} />,
    value: requiresKey
},
{
  name: 'Hand Dryer',
  icon: <MdOutlineAir size={25} className={handDryer ? "text-stone-500" : "text-stone-100"} />,
  value: handDryer
},
{
  name: 'Feminine Products',
  icon: <LiaFemaleSolid size={25} className={feminineProducts ? "text-stone-500" : "text-stone-100"} />,
  value: feminineProducts
},
{
  name: 'Toilet Covers',
  icon: <MdAirlineSeatLegroomNormal size={25} className={toiletCovers ? "text-stone-500" : "text-stone-100"} />,
  value: toiletCovers
},
{
  name: 'Bidet',
  icon: <GiSplashyStream size={25} className={bidet ? "text-stone-500" : "text-stone-100"} />,
  value: bidet
},
{
  name: 'Single Stall',
  icon: <LiaToiletSolid size={25} className={singleStall ? "text-stone-500" : "text-stone-100"} />,
  value: singleStall
},
{
  name: 'Multiple Stalls',
  icon: <HiUserGroup size={25} className={multipleStall ? "text-stone-500" : "text-stone-100"} />,
  value: multipleStall
},
{
  name: 'Trash Can',
  icon: <BsFillTrash3Fill size={25} className={trashCan ? "text-stone-500" : "text-stone-100"} />,
  value: trashCan
},
{
  name: 'Good Flooring',
  icon: <GiWoodBeam size={25} className={goodFlooring ? "text-stone-500" : "text-stone-100"} />,
  value: goodFlooring
},
{
  name: 'Coat Hook',
  icon: <PiCoatHangerBold size={25} className={coatHook ? "text-stone-500" : "text-stone-100"} />,
  value: coatHook
},
{
  name: 'Braille Sign',
  icon: <BiBraille size={25} className={brailleSign ? "text-stone-500" : "text-stone-100"} />,
  value: brailleSign
},
{
  name: 'Hot Water',
  icon: <PiThermometerHotFill size={25} className={hotWater ? "text-stone-500" : "text-stone-100"} />,
  value: hotWater
},
{
  name: 'First Aid Kit',
  icon: <PiFirstAidKit size={25} className={firstAid ? "text-stone-500" : "text-stone-100"} />,
  value: firstAid
},
{
  name: 'Sharps Disposal',
  icon: <PiSyringe size={25} className={sharpsDisposal ? "text-stone-500" : "text-stone-100"} />,
  value: sharpsDisposal
},


];

  const { id } = useParams();

  return (
    <>

      <div className=" Bathroomlist-bg overflow-scroll overflow-y-auto">
        <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Back To Home
        </Link>


        <div className="container mx-auto p-4 flex flex-row justify-between">

          <div className="flex flex-col  flex-grow">

            <div className="shad flex-col items-center justify-center bg-sky-700 bg-opacity-60 rounded" >
            <div className="flex flex-col items-center space-x-4 justify-center ">

              <h1 className="text-7xl font-bold py-7 tracking-wide">{name}</h1> 

              <div className="flex-row flex">
              <RatingDisplay className="scale-150 px-8" rating={rating} />
              <p className="text-2xl  text-gray-300"> {rating} Stars</p>
              </div>

           
            <p className="text-2xl  py-2 justify-center items-center tracking-widest"> {address}</p>

            {/* <img src={photo} alt={name} className="w-full h-64 object-cover mb-4 rounded" /> */}

            <div className=" flex flex-row items-center mb-4 px-2 py-2 space-x-4 rounded">

              <p className="text-lg ">
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

              <p className="text-lg ">
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

              <p className="text-lg ">
                {emergencyCord ?
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center">
                    <GrEmergency size={45} />
                  </span>
                  :
                  <span className="bg-sky-700 rounded-full p-2 inline-flex items-center justify-center opacity-20 ">
                    <GrEmergency size={45} />
                  </span>}
              </p>

              <p className="text-lg ">
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

                  <div className="py-5 ">
                      <Link to
                        ={`/bathrooms/${id}/addReview`}
                        className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-teal-600 "
                      >
                        Add a Review
                      </Link>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 ">Reviews</h2>
                    <h6 className="text-2xl font-bold mt-8 mb-4">
            {Reviews.length} {Reviews.length === 1 ? 'Review' : 'Reviews'}
          </h6>
                    {Reviews.map((review) => {
                      // Find the user associated with the review
                      const reviewUser = allUsers.find(user => user.id === review.UserId);
                      console.log("reviewUser", reviewUser);
                      return (
                        <div key={review.id} className="shad bg-lime-950 p-4 mx-2 rounded-lg bg-opacity-70">
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

          <div className={`flex shad flex-col mx-2 px-4 py-6 space-y-4 max-w-sm w-full md:w-1/4 bg-sky-800 rounded-lg bg-opacity-60 text-white p-2 transition-all duration-500 ${columnSize}`}>
          <h1 className="text-3xl font-semibold"> Amenities :</h1>
          <div>
            {showFullList ? (
                <div>
                    {amenities.map((amenity, index) => (
                        <p key={index} className="text-sm md:text-lg  text-blue-900 mb-2 flex flex-wrap items-center space-x-2 bg-stone-200 rounded p-1">
                            <span className={amenity.value ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-stone-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                                {amenity.icon}
                            </span>
                            {amenity.name}:
                            <span className="font-semibold flex-shrink-0">
                                {amenity.value ? ( 
                                <span className="flex items-center">
                                Yes 
                                <span className="ml-1">{amenity.value}</span>
                                <BiLike className="ml-1"/>
                                </span>) : "No"}
                            </span>
                        </p>
                    ))}
                </div>
            ) : (
                <div>
                    {amenities.slice(0, 7).map((amenity, index) => (
                        <p key={index} className="text-sm md:text-lg shad text-blue-900 mb-2 flex flex-wrap items-center space-x-2 bg-stone-200 bg-opacity-80 rounded p-1">
                            <span className={amenity.value ? "bg-stone-100 border border-gray-300 mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-stone-400 border border-gray-500 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
                                {amenity.icon}
                            </span>
                            {amenity.name}:
                            <span className="font-semibold flex-shrink-0">
                                {amenity.value ? ( 
                                <span className="flex items-center">
                                Yes 
                                <span className="ml-1">{amenity.value}</span>
                                <BiLike className="ml-1"/>
                                </span>) : "No"}
                            </span>
                        </p>
                    ))}
                </div>
            )}
            <button onClick={() => setShowFullList(!showFullList)}>
                {showFullList ? 'Show Less' : 'Show More'}
            </button>
        </div>

          </div>



        </div>

      </div>
    </>


  );

}