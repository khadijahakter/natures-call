import React from 'react';
import './About.css';
import { Link, NavLink, useLoaderData, } from "react-router-dom";
import { FcLeft } from "react-icons/fc";
import LineForBr from '../images/LineForBr.png';

export default function About() {
    return (
        
        <>
            <div
                className="hero bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${LineForBr})`,
                    backgroundSize: "95%", 
                    backgroundColor: "#f4f3f3"
                }}
            >
                <div className="text-center text-black font-inter text-5xl font-extrabold">About Us</div>
            </div>

            <div className="section bg-blue-gradient text-white max-w-full h-screen flex flex-col justify-center items-center ">
                <h2 className="font-inter text-4xl font-extrabold tracking-tight mb-4">Our Story</h2>
                <h3 className="text-xl mt-1 text-lg font-medium mb-4 italic-text">Born From Necessity, Shaping the Future of Comfortable Travel</h3>
                <p className="text-xl leading-7 mb-4">
                    Navigating through unfamiliar areas can often be challenging, and the struggle of finding a restroom when you need it the most can add to the stress. That's why we created Nature's Call. Our journey began in 2020 with a simple goal: to make restroom searches quick, easy, and reliable.
                </p>
            </div>
            <div className="section bg-white text-black max-w-full h-screen flex flex-col justify-center items-center">
                <h2 className="font-inter text-3xl font-extrabold tracking-tight mb-4">How It Works</h2>
                <h3 className="text-xl mt-1 text-lg font-medium mb-4 italic-text">Location, Locate, Review - Your Pathway to a Pleasant Pause</h3>
                <p className="text-xl leading-7 mb-4">
                    Our user-friendly web application is designed with real-life travel scenarios in mind. Simply enter your location, and our intelligent system will identify and display nearby restrooms in a matter of seconds. But we didn't stop there - we also incorporated a review feature that allows users to rate their experiences and share them with our community, ensuring everyone benefits from genuine, firsthand information.
                </p>
            </div>
            <div className="section bg-blue-gradient text-white max-w-full h-screen flex flex-col justify-center items-center ">
                <h2 className="font-inter text-4xl font-extrabold tracking-tight mb-4">Our Community</h2>
                <h3 className="text-xl mt-1 text-lg font-medium mb-4 italic-text">Community-Powered Comfort - Together, Making Every Restroom Stop Better</h3>
                <p className="text-xl leading-7 mb-4">
                    Our strength lies in our users. We've built a strong community that adds to our robust database of restrooms and reviews. At Nature's Call, every user contributes towards making the application more reliable and accurate for everyone. By leaving a review, you're not only assisting fellow users but also promoting cleanliness and hygiene in public restrooms.
                </p>
            </div>
            <div className="section bg-white text-black max-w-full h-screen flex flex-col justify-center items-center">
                <h2 className="font-inter text-4xl font-extrabold tracking-tight mb-4">Our Commitment</h2>
                <h3 className="text-xl mt-1 text-lg font-medium mb-4 italic-text">Committed to Your Comfort, Dedicated to Your Journey</h3>
                <p className="text-xl leading-7 mb-4">
                    At Nature's Call, we are committed to making your everyday journeys comfortable and hassle-free. We believe that everyone deserves easy access to clean, safe, and well-maintained restrooms. By constantly refining our database and enhancing our interface, we are working tirelessly to provide the best service possible.
                </p>
            </div>
        </>
    );
}