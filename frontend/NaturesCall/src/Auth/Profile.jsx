import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import './Profile.css';
import toiletPaperAnimation from '../images/ToiletPaper.mp4';

export async function loader({ params }) {
  try {
    const [allBathroomsResponse, profileresponse, reviewsResponse, bathroomsResponse] = await Promise.all([
      fetch(`/api/userProfileData/bathrooms`),
      fetch(`/api/userProfileData/userData`),
      fetch(`/api/userProfileData/myReviews`),
      fetch(`/api/userProfileData/myBathrooms`),
    ]);

    const allBathrooms = await allBathroomsResponse.json();
    const profileData = await profileresponse.json();
    const reviewsData = await reviewsResponse.json();
    const userBathrooms = await bathroomsResponse.json();

    return { allBathrooms, profileData, reviewsData, userBathrooms };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const promptForNewProfilePhoto = (setNewProfilePhoto) => {
  const url = prompt("Please enter the new profile picture URL:", "");
  if (url) {
    setNewProfilePhoto(url);
  }
};

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // <-- Moved inside here

  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const navigate = useNavigate();
  const { allBathrooms, profileData, reviewsData, userBathrooms } = useLoaderData();

  const getBathroomNameById = (BathroomId) => {
    const bathroom = allBathrooms.find((bathroom) => Number(bathroom.id) === Number(BathroomId));
    return bathroom ? bathroom.name : "Unknown Bathroom. It may have been deleted :( ";
  };

  const handleDeleteBathroom = async (bathroomId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bathroom?");
    if (confirmDelete) {
      setDeleteInProgress(true);
      try {
        const response = await fetch(`/api/bathroomActions/bathrooms/${bathroomId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: profileData.user.id }),
        });

        if (response.ok) {
          setUpdatedProfileData(prevData => ({
            ...prevData,
            userBathrooms: userBathrooms.filter(bathroom => bathroom.id !== bathroomId),
          }));
          navigate('/profile');
        } else {
          console.error("Failed to delete bathroom");
        }
      } catch (error) {
        console.error("Error deleting bathroom:", error);
      }
      setDeleteInProgress(false);
    }
  };

  const [newProfilePhoto, setNewProfilePhoto] = useState("");
  const [profilePhotoKey, setProfilePhotoKey] = useState(0);
  const [updatedProfileData, setUpdatedProfileData] = useState(profileData);

  const handleProfilePhotoUpdate = async () => {
    try {
      const response = await fetch(`/api/userProfileData/user/updateprofilepic`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: profileData.user.id,
          newProfilePhoto: newProfilePhoto,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUpdatedProfileData(updatedData);
        setProfilePhotoKey(prevKey => prevKey + 1);
        setUpdatedProfileData(prevData => ({
          ...prevData,
          user: {
            ...prevData.user,
            photo: newProfilePhoto,
          },
        }));
      } else {
        console.error("Failed to update profile photo");
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // If 0, make it 12

    return `${monthName} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="page-container">

      <div className="main-content">
        <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
          Back To Home
        </Link>

        <h1 className="profile-header">Welcome Back, {profileData.user.name}</h1>

        <div className="bathrooms-reviews-container">
          <div className="bathrooms-container">
            <h2 className="bathroom-header"> Your Bathrooms </h2>
            {userBathrooms.map((bathroom) => (
              <div key={bathroom.id} className="bathroom-item">
                <p>Name: <Link className="bathroom-link" to={`/bathrooms/${bathroom.id}`}>{bathroom.name}</Link></p>
                <p>Address: {bathroom.address}</p>
                <p>Rating: {bathroom.rating !== null ? bathroom.rating + " stars" : "No rating yet"}</p>
                <p>Content: {bathroom.content !== null ? bathroom.content : "No content available"}</p>
                <p>Date Created: {formatDate(bathroom.createdAt)}</p>
                {bathroom.updatedAt !== bathroom.createdAt && (
                  <p>Date Updated: {formatDate(bathroom.updatedAt)}</p>
                )}
                <hr />
                <div className="button-container">
                  <button className="edit-button"><Link to={`/editBathroom/${bathroom.id}`}> Edit | </Link></button>
                  <button onClick={() => handleDeleteBathroom(bathroom.id)} disabled={deleteInProgress}>
                    {deleteInProgress ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="reviews-container">
            <h2 className="review-header"> Your Reviews </h2>
            {reviewsData.map((review) => (
    <div key={review.id} className="review-item p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-2">
            <Link className="bathroom-link text-blue-600 hover:text-blue-800" to={`/bathrooms/${review.BathroomId}`}>{getBathroomNameById(review.BathroomId)}</Link>
        </h2>
        <p className="mb-2">Rating: {review.rating} stars</p>
        <p className="text-sm text-gray-600 mb-2 font-bold" style={{ color: '#0F3D5F' }}>{review.content}</p>
        <p className="text-xs text-right text-gray-500">{formatDate(review.createdAt)}</p>
        <hr className="mt-4" />
    </div>
))}

          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontWeight: 'bold', color: '#0F3D5F' }}>Update Profile Picture</h2>
            <input
              type="text"
              placeholder="Enter Image URL"
              value={newProfilePhoto}
              onChange={(e) => setNewProfilePhoto(e.target.value)}
            />
            <div className="modal-buttons">
              <button style={{ color: '#0F3D5F' }} onClick={handleProfilePhotoUpdate}>Update</button>
              <button style={{ color: '#0F3D5F' }} onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="sidebar right-sidebar">
        <div className="user-card">
          <div className="profile-photo-container" style={{ marginBottom: "30px" }}>
            <img
              key={profilePhotoKey}
              className="profile-photo-image"
              src={updatedProfileData.user.photo}
              alt="Profile Pic"
              title="Click to Edit Image"
              onClick={() => setIsModalOpen(true)}
            />


          </div>
          <h3>User @{profileData.user.name}</h3>
          {/* <h4>Email: {profileData.user.email}</h4> */}
          <div className="user-details-grid">
            <p>Bathroom Posts</p>
            <p>Reviews</p>
            <p>Joining Day</p>
            <p>{userBathrooms.length}</p>
            <p>{reviewsData.length}</p>
            <p>{profileData.user.createdAt}</p>
          </div>


        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <video width="300" height="100" autoPlay loop muted>
            <source src={toiletPaperAnimation} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

  );
}    