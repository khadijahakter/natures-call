import React from "react";
import { Form, redirect, Link, useParams, useNavigate} from "react-router-dom";
// const navigate = useNavigate();

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

    // navigate (`/bathrooms/${params.id}`);

//edit bathroom rating
    const updateresponse = await fetch(`http://localhost:4000/bathrooms/${params.id}`, {
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
        
        <Form method="post" className="p-8 bg-blue-300 text-black rounded"onSubmit={handleSubmit}>
            <Link to={`/bathrooms/${id}`}  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        Back To Bathroom Page
      </Link>
            <h1 className="text-2xl font-bold text-center mb-8">Create Review</h1>

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

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have an Emergency Button?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="emergencyButtonYes" name="emergencyButton" value="1" />
                        <label htmlFor="emergencyButtonYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="emergencyButtonNo" name="emergencyButton" value="0" />
                        <label htmlFor="emergencyButtonNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="emergencyButtonUnknown" name="emergencyButton" value="3" defaultChecked />
                        <label htmlFor="emergencyButtonUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Is it Pet Friendly?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="petFriendlyYes" name="petFriendly" value="1" />
                        <label htmlFor="petFriendlyYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="petFriendlyNo" name="petFriendly" value="0" />
                        <label htmlFor="petFriendlyNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="petFriendlyUnknown" name="petFriendly" value="3" defaultChecked />
                        <label htmlFor="petFriendlyUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it require a key?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="requiresKeyYes" name="requiresKey" value="1" />
                        <label htmlFor="requiresKeyYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="requiresKeyNo" name="requiresKey" value="0" />
                        <label htmlFor="requiresKeyNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="requiresKeyUnknown" name="requiresKey" value="3" defaultChecked />
                        <label htmlFor="requiresKeyUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a hand dryer?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="handDryerYes" name="handDryer" value="1" />
                        <label htmlFor="handDryerYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="handDryerNo" name="handDryer" value="0" />
                        <label htmlFor="handDryerNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="handDryerUnknown" name="handDryer" value="3" defaultChecked />
                        <label htmlFor="handDryerUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have feminine products?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="feminineProductsYes" name="feminineProducts" value="1" />
                        <label htmlFor="feminineProductsYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="feminineProductsNo" name="feminineProducts" value="0" />
                        <label htmlFor="feminineProductsNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="feminineProductsUnknown" name="feminineProducts" value="3" defaultChecked />
                        <label htmlFor="feminineProductsUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have toilet covers?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="toiletCoversYes" name="toiletCovers" value="1" />
                        <label htmlFor="toiletCoversYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="toiletCoversNo" name="toiletCovers" value="0" />
                        <label htmlFor="toiletCoversNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="toiletCoversUnknown" name="toiletCovers" value="3" defaultChecked />
                        <label htmlFor="toiletCoversUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a bidet?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="bidetYes" name="bidet" value="1" />
                        <label htmlFor="bidetYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="bidetNo" name="bidet" value="0" />
                        <label htmlFor="bidetNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="bidetUnknown" name="bidet" value="3" defaultChecked />
                        <label htmlFor="bidetUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Is it wheelchair accessible?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="wheelchairYes" name="wheelchair" value="1" />
                        <label htmlFor="wheelchairYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="wheelchairNo" name="wheelchair" value="0" />
                        <label htmlFor="wheelchairNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="wheelchairUnknown" name="wheelchair" value="3" defaultChecked />
                        <label htmlFor="wheelchairUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Is it a single stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="singleStallYes" name="singleStall" value="1" />
                        <label htmlFor="singleStallYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="singleStallNo" name="singleStall" value="0" />
                        <label htmlFor="singleStallNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="singleStallUnknown" name="singleStall" value="3" defaultChecked />
                        <label htmlFor="singleStallUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Is it a multiple stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="multipleStallYes" name="multipleStall" value="1" />
                        <label htmlFor="multipleStallYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="multipleStallNo" name="multipleStall" value="0" />
                        <label htmlFor="multipleStallNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="multipleStallUnknown" name="multipleStall" value="3" defaultChecked />
                        <label htmlFor="multipleStallUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a changing table?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="changingTableYes" name="changingTable" value="1" />
                        <label htmlFor="changingTableYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="changingTableNo" name="changingTable" value="0" />
                        <label htmlFor="changingTableNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="changingTableUnknown" name="changingTable" value="3" defaultChecked />
                        <label htmlFor="changingTableUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a trash can?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="trashCanYes" name="trashCan" value="1" />
                        <label htmlFor="trashCanYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="trashCanNo" name="trashCan" value="0" />
                        <label htmlFor="trashCanNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="trashCanUnknown" name="trashCan" value="3" defaultChecked />
                        <label htmlFor="trashCanUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have good flooring?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="goodFlooringYes" name="goodFlooring" value="1" />
                        <label htmlFor="goodFlooringYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="goodFlooringNo" name="goodFlooring" value="0" />
                        <label htmlFor="goodFlooringNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="goodFlooringUnknown" name="goodFlooring" value="3" defaultChecked />
                        <label htmlFor="goodFlooringUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have an air freshener?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="airFreshenerYes" name="airFreshener" value="1" />
                        <label htmlFor="airFreshenerYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="airFreshenerNo" name="airFreshener" value="0" />
                        <label htmlFor="airFreshenerNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="airFreshenerUnknown" name="airFreshener" value="3" defaultChecked />
                        <label htmlFor="airFreshenerUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Is it automatic?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="automaticYes" name="automatic" value="1" />
                        <label htmlFor="automaticYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="automaticNo" name="automatic" value="0" />
                        <label htmlFor="automaticNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="automaticUnknown" name="automatic" value="3" defaultChecked />
                        <label htmlFor="automaticUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a coat hook?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="coatHookYes" name="coatHook" value="1" />
                        <label htmlFor="coatHookYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="coatHookNo" name="coatHook" value="0" />
                        <label htmlFor="coatHookNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="coatHookUnknown" name="coatHook" value="3" defaultChecked />
                        <label htmlFor="coatHookUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a Braille sign?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="brailleSignYes" name="brailleSign" value="1" />
                        <label htmlFor="brailleSignYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="brailleSignNo" name="brailleSign" value="0" />
                        <label htmlFor="brailleSignNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="brailleSignUnknown" name="brailleSign" value="3" defaultChecked />
                        <label htmlFor="brailleSignUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have hot water?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="hotWaterYes" name="hotWater" value="1" />
                        <label htmlFor="hotWaterYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="hotWaterNo" name="hotWater" value="0" />
                        <label htmlFor="hotWaterNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="hotWaterUnknown" name="hotWater" value="3" defaultChecked />
                        <label htmlFor="hotWaterUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a first aid kit?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="firstAidYes" name="firstAid" value="1" />
                        <label htmlFor="firstAidYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="firstAidNo" name="firstAid" value="0" />
                        <label htmlFor="firstAidNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="firstAidUnknown" name="firstAid" value="3" defaultChecked />
                        <label htmlFor="firstAidUnknown" className="dark:text-gray-300">Unknown</label>
                    </div>
                </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-300">
                    <p className="text-lg font-semibold mb-2">Does it have a sharps disposal?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="sharpsDisposalYes" name="sharpsDisposal" value="1" />
                        <label htmlFor="sharpsDisposalYes" className="mr-4 dark:text-gray-300">Yes</label>
                        <input type="radio" id="sharpsDisposalNo" name="sharpsDisposal" value="0" />
                        <label htmlFor="sharpsDisposalNo" className="mr-4 dark:text-gray-300">No</label>
                        <input type="radio" id="sharpsDisposalUnknown" name="sharpsDisposal" value="3" defaultChecked />
                        <label htmlFor="sharpsDisposalUnknown" className="dark:text-gray-300">Unknown</label>
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