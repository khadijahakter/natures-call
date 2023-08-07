import React from "react";
import { Form, redirect, Link } from "react-router-dom";
export async function action({ request, params }) {
    let formData = await request.formData();
    let bathroomData = Object.fromEntries(formData);
    const response = await fetch("http://localhost:4000/bathrooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bathroomData)
    })
    console.log("bathroomData: ", bathroomData);
    return redirect('/');
}
export default function AddBathroom() {
    return (
        <>

           
                <Form method="post" className="w-3/4 m-5 flex-col p-8 bg-gray-300 text-black rounded overflow-y-auto max-h-screen pb-20 mb-20">
                    <h1 className="text-2xl font-bold text-center mb-8 text-sky-950 tracking-wide">Add A Bathroom!</h1>
                    <fieldset>
                        <div className="flex flex-col gap-4 mb-4">
                            <textarea
                                id="address"
                                name="address"
                                className=" addBinput p-2 rounded bg-opacity-40 bg-sky-900 placeholder-gray-600"
                                rows="1"
                                placeholder="Enter the address here"
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="flex flex-col gap-4 mb-4">
                            <textarea
                                id="name"
                                name="name"
                                className="addBinput p-2 rounded bg-opacity-40 bg-sky-900 placeholder-gray-600"
                                rows="1"
                                placeholder="Enter the name here"
                            />
                        </div>
                    </fieldset>

                    <fieldset className="mb-8">
                        <h4 className="mb-1 font-semibold text-gray-900 dark:text-sky-950 tracking-widest">Is it Unisex?</h4>
                        <ul className="items-center w-full text-sm font-medium text-sky-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-sky-950 dark:border-sky-600 dark:text-sky-100">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="unisexYes" type="radio" name="unisex" value="1" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="unisexYes" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="unisexNo" type="radio" name="unisex" value="0" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="unisexNo" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="unisexUnknown" type="radio" name="unisex" value="3" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="unisexUnknown" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown</label>
                                </div>
                            </li>
                        </ul>

                    </fieldset>

                    <fieldset className="mb-8">
                        <h4 className="mb-1 font-semibold text-gray-900 dark:text-sky-950 tracking-widest">Does it have an Emergency Cord?</h4>
                        <ul className="items-center w-full text-sm font-medium text-sky-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-sky-950 dark:border-sky-600 dark:text-sky-100">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyCordYes" type="radio" name="emergencyCord" value="1" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyCordYes" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyCordNo" type="radio" name="emergencyCord" value="0" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyCordNo" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyCordUnknown" type="radio" name="emergencyCord" value="3" defaultChecked className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyCordUnknown" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className="mb-8">
                        <h4 className="mb-1 font-semibold text-gray-900 dark:text-sky-950 tracking-widest">Does it have an Emergency Button?</h4>
                        <ul className="items-center w-full text-sm font-medium text-sky-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-sky-950 dark:border-sky-600 dark:text-sky-100">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyButtonYes" type="radio" name="emergencyButton" value="1" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyButtonYes" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyButtonNo" type="radio" name="emergencyButton" value="0" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyButtonNo" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="emergencyButtonUnknown" type="radio" name="emergencyButton" value="3" defaultChecked className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="emergencyButtonUnknown" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>

                    <fieldset className="mb-8">
                        <h4 className="mb-1 font-semibold text-gray-900 dark:text-sky-950 tracking-widest">Is it Pet Friendly?</h4>
                        <ul className="items-center w-full text-sm font-medium text-sky-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-sky-950 dark:border-sky-600 dark:text-sky-100">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="petFriendlyYes" type="radio" name="petFriendly" value="1" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="petFriendlyYes" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="petFriendlyNo" type="radio" name="petFriendly" value="0" className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="petFriendlyNo" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                                <div className="flex items-center pl-3">
                                    <input id="petFriendlyUnknown" type="radio" name="petFriendly" value="3" defaultChecked className="w-4 h-4 text-blue-900 bg-blue-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-blue-500" />
                                    <label htmlFor="petFriendlyUnknown" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown</label>
                                </div>
                            </li>
                        </ul>
                    </fieldset>

                    <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white p-2 px-4 rounded mb-6 w-full"
                    >
                        Submit Review
                    </button>
                </Form>
          
        </>
    );
}