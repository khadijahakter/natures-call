import React from "react";
import { Form, redirect, Link, useParams, useNavigate } from "react-router-dom";
// const navigate = useNavigate();
import { useState } from "react";

export async function action({ request, params }) {
    let formData = await request.formData();
    let bathroomData = Object.fromEntries(formData);

    // -- ADD USER ID FROM SESSION WHEN AUTH CONTEXT WORK --
    //create review
    const response = await fetch(`/api/userActions/${params.id}/reviews`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bathroomData),
    });
    console.log("review call response:", response);
    //edit bathroom rating
    const updateresponse = await fetch(`/api/bathroomActions/bathroomsrating/${params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bathroomData),
    });

    console.log("hannaaaaaaaaaah" + updateresponse);

    return redirect(`/bathrooms/${params.id}`);

}

export default function AddReviewForm() {

    const { id } = useParams();
    const [rating, setRating] = useState(0);

    const handleRating = (star) => {
        setRating(star);
    };


    const handleSubmit = (event) => {
        const rating = event.target.rating.value;

        if (!rating) {
            alert("Please provide a rating before submitting.");
            event.preventDefault(); // Prevent form submission
        } else if (rating < 0 || rating > 5) {
            alert("Rating should be between 0 and 5.");
            event.preventDefault(); // Prevent form submission
        }
    };
    return (

        <Form method="post" className="p-8 bg-blue-300 text-black rounded" onSubmit={handleSubmit}>
            <Link to={`/bathrooms/${id}`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Back To Bathroom Page
            </Link>
            <h1 className="text-2xl font-bold text-center mb-8">Create Review</h1>

            <fieldset>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? "filled" : ""}`}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <input type="hidden" id="rating" name="rating" value={rating} />
                </div>
            </fieldset>


            <fieldset>
                <div className="flex flex-col gap-4 mb-4">
                    <textarea
                        id="content"
                        name="content"
                        className="border-2 border-blue-500 p-2 rounded"
                        rows="4"
                        placeholder="Enter your review here"
                    />
                </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-4">
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it Unisex?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>


                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have an Emergency Cord?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have an Emergency Button?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it Pet Friendly?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it require a key?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a hand dryer?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have feminine products?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have toilet covers?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a bidet?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it wheelchair accessible?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it a single stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it a multiple stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a changing table?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a trash can?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have good flooring?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have an air freshener?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Is it automatic?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a coat hook?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a Braille sign?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have hot water?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a first aid kit?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold mb-2">Does it have a sharps disposal?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full"
            >
                Submit Review
            </button>
        </Form>
    );
}