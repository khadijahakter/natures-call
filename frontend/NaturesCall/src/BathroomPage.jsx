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
        icon: <PiWheelchairFill size={20} className={wheelchair ? "text-sky-900" : "text-white"} />,
        value: wheelchair
    },
    {
        name: 'Unisex',
        icon: <PiGenderNeuterLight size={25} className={unisex ? "text-sky-900" : "text-white"}/>,
        value: unisex
    },
    {
        name: 'Emergency cord',
        icon: <GrEmergency size={25} className={emergencyCord ? "text-sky-900" : "text-white"}/>,
        value: emergencyCord
    },
    {
      name: 'Changing Table',
      icon: <MdBabyChangingStation size={20} className={changingTable ? "text-sky-900" : "text-white"} />,
      value: changingTable
  },
  {
      name: 'Emergency Button',
      icon: <GiButtonFinger size={20} className={emergencyButton ? "text-sky-900" : "text-white"} />,
      value: emergencyButton
  }, 
  {
    name: 'Pet Friendly',
    icon: <MdPets size={20} className={petFriendly ? "text-sky-900" : "text-white"} />,
    value: petFriendly
},
{
    name: 'Requires Key',
    icon: <ImKey size={20} className={requiresKey ? "text-sky-900" : "text-white"} />,
    value: requiresKey
},
{
  name: 'Hand Dryer',
  icon: <MdOutlineAir size={20} className={handDryer ? "text-sky-900" : "text-white"} />,
  value: handDryer
},
{
  name: 'Feminine Products',
  icon: <LiaFemaleSolid size={20} className={feminineProducts ? "text-sky-900" : "text-white"} />,
  value: feminineProducts
},
{
  name: 'Toilet Covers',
  icon: <MdAirlineSeatLegroomNormal size={20} className={toiletCovers ? "text-sky-900" : "text-white"} />,
  value: toiletCovers
},
{
  name: 'Bidet',
  icon: <GiSplashyStream size={20} className={bidet ? "text-sky-900" : "text-white"} />,
  value: bidet
},
{
  name: 'Single Stall',
  icon: <LiaToiletSolid size={20} className={singleStall ? "text-sky-900" : "text-white"} />,
  value: singleStall
},
{
  name: 'Multiple Stalls',
  icon: <HiUserGroup size={20} className={multipleStall ? "text-sky-900" : "text-white"} />,
  value: multipleStall
},
{
  name: 'Trash Can',
  icon: <BsFillTrash3Fill size={20} className={trashCan ? "text-sky-900" : "text-white"} />,
  value: trashCan
},
{
  name: 'Good Flooring',
  icon: <GiWoodBeam size={20} className={goodFlooring ? "text-sky-900" : "text-white"} />,
  value: goodFlooring
},
{
  name: 'Coat Hook',
  icon: <PiCoatHangerBold size={20} className={coatHook ? "text-sky-900" : "text-white"} />,
  value: coatHook
},
{
  name: 'Braille Sign',
  icon: <BiBraille size={20} className={brailleSign ? "text-sky-900" : "text-white"} />,
  value: brailleSign
},
{
  name: 'Hot Water',
  icon: <PiThermometerHotFill size={20} className={hotWater ? "text-sky-900" : "text-white"} />,
  value: hotWater
},
{
  name: 'First Aid Kit',
  icon: <PiFirstAidKit size={20} className={firstAid ? "text-sky-900" : "text-white"} />,
  value: firstAid
},
{
  name: 'Sharps Disposal',
  icon: <PiSyringe size={20} className={sharpsDisposal ? "text-sky-900" : "text-white"} />,
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
          <div>
            {showFullList ? (
                <div>
                    {amenities.map((amenity, index) => (
                        <p key={index} className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                            <span className={amenity.value ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
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
                    {amenities.slice(0, 5).map((amenity, index) => (
                        <p key={index} className="text-sm md:text-lg mb-2 flex flex-wrap items-center space-x-2">
                            <span className={amenity.value ? "bg-white mr-2 rounded-full p-2 inline-flex items-center justify-center" : "bg-gray-400 mr-2 rounded-full p-2 inline-flex items-center justify-center opacity-60"}>
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