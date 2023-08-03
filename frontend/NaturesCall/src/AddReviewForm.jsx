import React from "react";
import { Form, redirect,Link} from "react-router-dom";

export async function action({request, params}){
const formData = await request.formData();

const response = await fetch(`http://localhost:4000/bathrooms/${params.id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Use the JSON-serializable object
  });

}

export default function AddReviewForm(){

      return (
        <Form method="post" className="p-4 bg-blue-200 text-white">
          <h1 className="text-2xl font-bold text-center mb-4">Create Review</h1>
    
        <fieldset>
            <legend>Choose your favorite monster</legend>

            <input type="radio" id="kraken" name="monster" value="K" />
            <label for="kraken">Kraken</label><br />

            <input type="radio" id="sasquatch" name="monster" value="S" />
            <label for="sasquatch">Sasquatch</label><br />

            <input type="radio" id="mothman" name="monster" value="M" />
            <label for="mothman">Mothman</label>
        </fieldset>
    
          <div className="flex flex-col gap-4">
            <label className="font-bold">Photo</label>
            <input
              type="url"
              name="photo"
              className="border-2 border-blue-500 p-2 rounded"
            />
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="wheelchair" className="h-6 w-6" />
            <label className="font-bold">Wheelchair Accessible</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="unisex" className="h-6 w-6" />
            <label className="font-bold">Unisex</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="emergencyCord" className="h-6 w-6" />
            <label className="font-bold">Emergency Cord</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="emergencyButton" className="h-6 w-6" />
            <label className="font-bold">Emergency Button</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="petFriendly" className="h-6 w-6" />
            <label className="font-bold">Pet Friendly</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="requiresKey" className="h-6 w-6" />
            <label className="font-bold">Requires Key</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="handDryer" className="h-6 w-6" />
            <label className="font-bold">Hand Dryer</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="feminineProducts" className="h-6 w-6" />
            <label className="font-bold">Feminine Products</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="toiletCovers" className="h-6 w-6" />
            <label className="font-bold">Toilet Covers</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="bidet" className="h-6 w-6" />
            <label className="font-bold">Bidet</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="singleStall" className="h-6 w-6" />
            <label className="font-bold">Single Stall</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="multipleStall" className="h-6 w-6" />
            <label className="font-bold">Multiple Stall</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="changingTable" className="h-6 w-6" />
            <label className="font-bold">Changing Table</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="trashCan" className="h-6 w-6" />
            <label className="font-bold">Trash Can</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="goodFlooring" className="h-6 w-6" />
            <label className="font-bold">Good Flooring</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="airFreshener" className="h-6 w-6" />
            <label className="font-bold">Air Freshener</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="automatic" className="h-6 w-6" />
            <label className="font-bold">Automatic</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="coatHook" className="h-6 w-6" />
            <label className="font-bold">Coat Hook</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="brailleSign" className="h-6 w-6" />
            <label className="font-bold">Braille Sign</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="hotWater" className="h-6 w-6" />
            <label className="font-bold">Hot Water</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="firstAid" className="h-6 w-6" />
            <label className="font-bold">First Aid</label>
          </div>
    
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="sharpsDisposal" className="h-6 w-6" />
            <label className="font-bold">Sharps Disposal</label>
          </div>
    
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Submit Review
          </button>
        </Form>
      );
    
    
    
}