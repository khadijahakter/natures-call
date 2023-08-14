import React, { useState } from "react";
import { Form, Link, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

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
    console.log("review call response:",response);
//edit bathroom rating
    const updateresponse = await fetch(`http://localhost:4000/bathrooms/${params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bathroomData),
    });
    return redirect(`/bathrooms/${params.id}`);

}

export default function AddReviewForm() {
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(1);

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

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <fieldset>
                        <div className="flex flex-col gap-4 mb-4">
                            <textarea
                                id="rating"
                                name="rating"
                                className="border-2 border-blue-500 p-2 rounded"
                                rows="1"
                                placeholder="Enter your rating here"
                                required
                                min="1"
                                max="5"
                            />
                            <textarea
                                id="content"
                                name="content"
                                className="border-2 border-blue-500 p-2 rounded"
                                rows="4"
                                placeholder="Enter your review here"
                            />
                        </div>
                    </fieldset>
                );
            case 2:
                return (
                    <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                        <p className="text-lg font-semibold mb-2">Is it Unisex?</p>
                        <div className="flex items-center space-x-4">
                            <input type="radio" id="unisexYes" name="unisex" value="1" />
                            <label htmlFor="unisexYes" className="mr-4 dark:text-gray-300">Yes</label>
                            <input type="radio" id="unisexNo" name="unisex" value="0" />
                            <label htmlFor="unisexNo" className="mr-4 dark:text-gray-300">No</label>
                            <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                            <label htmlFor="unisexUnknown" className="dark:text-gray-300">Unknown</label>
                        </div>
                    </fieldset>
                );
            case 3:
                return (
                    <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                        <p className="text-lg font-semibold mb-2">Does it have an Emergency Cord?</p>
                        <div className="flex items-center space-x-4">
                            <input type="radio" id="emergencyCordYes" name="emergencyCord" value="1" />
                            <label htmlFor="emergencyCordYes" className="mr-4 dark:text-gray-300">Yes</label>
                            <input type="radio" id="emergencyCordNo" name="emergencyCord" value="0" />
                            <label htmlFor="emergencyCordNo" className="mr-4 dark:text-gray-300">No</label>
                            <input type="radio" id="emergencyCordUnknown" name="emergencyCord" value="3" defaultChecked />
                            <label htmlFor="emergencyCordUnknown" className="dark:text-gray-300">Unknown</label>
                        </div>
                    </fieldset>
                );
            default:
                return null;
        }
    }

    return (
        <Form method="post" className="p-8 bg-blue-300 text-black rounded" onSubmit={handleSubmit}>
            <Link to={`/bathrooms/${id}`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Back To Bathroom Page
            </Link>
            <h1 className="text-2xl font-bold text-center mb-8">Create Review</h1>

            <div className="mb-4">
                <p>Question {currentStep} of 3</p>
            </div>

            <CSSTransition
                in={true}
                timeout={300}
                classNames="fade"
                appear
                key={currentStep}
            >
                <div>
                    {renderStepContent()}
                </div>
            </CSSTransition>

            {currentStep < 3 && (
                <button onClick={handleNext} type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full">
                    Next
                </button>
            )}
            {currentStep > 1 && (
                <button onClick={handleBack} type="button" className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded mt-4 w-full">
                    Back
                </button>
            )}

            {currentStep === 3 && (
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full"
                >
                    Submit Review
                </button>
            )}
        </Form>
    );
}
