import { Form, redirect, useLoaderData } from "react-router-dom";
import{useState,useEffect} from 'react';


export async function loader({ params }) {
  try {

    console.log("params:", params);
  console.log("paramsID: ", params.id)
    const bathroomResponse = await fetch(`http://localhost:4000/bathrooms/${params.editId}`);
    const bathroom = await bathroomResponse.json();
    console.log("LOADER WORKED!!!")
    
    return { bathroom };
  } catch (error) {
    console.error("Error fetching bathroom data:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}
export default function EditBathroom(){
    const { bathroom } = useLoaderData();
    console.log("Bathroom data:", bathroom);

    const [brState, setBrState] = useState(bathroom);
    console.log("brState",brState)
    
    // useEffect(() => {
    //   if (bathroom) {
    //     setBrState(bathroom);
    //   }
    // }, [bathroom]);

    //this will happen when user changes input
  const handleInput = (e) => {
    setBrState((brState) => {
      return {
        ...brState,
        [e.target.name]: e.target.value,
      };
    });
  };


  const handleAddBrFormSubmit = async (e) => {
    e.preventDefault();
  
    const preparedBathroom = {
      //add more if needed
      address: brState.address,
      name: brState.name,
      unisex: brState.unisex,
      emergencyCord: brState.emergencyCord,
      emergencyButton: brState.emergencyButton,
      petFriendly: brState.petFriendly,
      rating: parseInt(brState.rating, 10),
    };
  console.log("prep: ", preparedBathroom)
    // Send the PATCH request to update the bathroom
    try {
      const response = await fetch(`http://localhost:4000/bathrooms/${brState.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedBathroom),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update bathroom");
      }
  
      // Update the local state with the response data
      const newestBathroom = await response.json();
      setBrState((prevBrState) => {
        return {
          ...prevBrState,
          ...newestBathroom,
        };
      });
      redirect("http://localhost:5173/profile")
  
      console.log("New BR STATE: ", brState);
      
    } catch (error) {
      console.error("Error updating bathroom:", error);
    }
  };
  


  return (
    <>
    <Form method="post" className="p-8 bg-blue-200 text-black rounded" id ="edit-form" onSubmit={handleAddBrFormSubmit}>
            <h1 className="text-2xl font-bold text-center mb-8">Edit A Bathroom!</h1>
    
         <fieldset>   
       <div className="flex flex-col gap-4 mb-4">
        <textarea
          id="address"
          name="address"
          className="border-2 border-blue-500 p-2 rounded"
          rows="1"
          placeholder="Enter the address here"
          onChange={handleInput}
          value={brState.address}
        />
      </div> 
        </fieldset>

     <fieldset>   
       <div className="flex flex-col gap-4 mb-4">
        <textarea
          id="name"
          name="name"
          className="border-2 border-blue-500 p-2 rounded"
          rows="1"
          placeholder="Enter the name here"
          onChange={handleInput}
        
          value={brState.name}
        />
      </div> 
        </fieldset>
        <fieldset>   
       <div className="flex flex-col gap-4 mb-4">
        <textarea
          id="rating"
          name="rating"
          className="border-2 border-blue-500 p-2 rounded"
          rows="1"
          placeholder="Enter the rating here"
          onChange={handleInput}
          value={brState.rating}
        />
      </div> 
        </fieldset>

            <fieldset className="mb-8">
                <legend className="text-lg font-semibold mb-2">Is it Unisex?</legend>
                <div className="flex items-center space-x-4">
                    <input onChange={handleInput} type="radio" id="unisexYes" name="unisex" value="1"  checked={brState.unisex==1} />
                    <label htmlFor="unisexYes" className="mr-4 dark:text-gray-300">Yes</label>
                    <input onChange={handleInput} type="radio" id="unisexNo" name="unisex" value="0" checked={brState.unisex==0} />
                    <label htmlFor="unisexNo" className="mr-4 dark:text-gray-300">No</label>
                    <input onChange={handleInput} type="radio" id="unisexUnknown" name="unisex" value="3"  checked={brState.unisex==3}  />
                    <label htmlFor="unisexUnknown" className="dark:text-gray-300">Unknown</label>
                </div>
            </fieldset>

            <fieldset className="mb-8" onChange={handleInput} value={brState.emergencyCord}> 
                <legend className="text-lg font-semibold mb-2">Does it have an Emergency Cord?</legend>
                <div className="flex items-center space-x-4">
                    <input onChange={handleInput} type="radio" id="emergencyCordYes" name="emergencyCord" value="1" checked={brState.emergencyCord==1} />
                    <label htmlFor="emergencyCordYes" className="mr-4 dark:text-gray-300">Yes</label>
                    <input onChange={handleInput} type="radio" id="emergencyCordNo" name="emergencyCord" value="0" checked={brState.emergencyCord==0} />
                    <label htmlFor="emergencyCordNo" className="mr-4 dark:text-gray-300">No</label>
                    <input onChange={handleInput} type="radio" id="emergencyCordUnknown" name="emergencyCord" value="3" checked={brState.unisemergencyCordex==3} />
                    <label htmlFor="emergencyCordUnknown" className="dark:text-gray-300">Unknown</label>
                </div>
            </fieldset>

            <fieldset className="mb-8" onChange={handleInput}>
                <legend className="text-lg font-semibold mb-2">Does it have an Emergency Button?</legend>
                <div className="flex items-center space-x-4">
                    <input onChange={handleInput} type="radio" id="emergencyButtonYes" name="emergencyButton" value="1" checked={brState.emergencyButton==1} />
                    <label htmlFor="emergencyButtonYes" className="mr-4 dark:text-gray-300">Yes</label>
                    <input onChange={handleInput} type="radio" id="emergencyButtonNo" name="emergencyButton" value="0" checked={brState.emergencyButton==0} />
                    <label htmlFor="emergencyButtonNo" className="mr-4 dark:text-gray-300">No</label>
                    <input onChange={handleInput} type="radio" id="emergencyButtonUnknown" name="emergencyButton" value="3" checked={brState.emergencyButton==3} />
                    <label htmlFor="emergencyButtonUnknown" className="dark:text-gray-300">Unknown</label>
                </div>
            </fieldset>

            <fieldset className="mb-8" onChange={handleInput}>
                <legend className="text-lg font-semibold mb-2">Is it Pet Friendly?</legend>
                <div className="flex items-center space-x-4">
                    <input onChange={handleInput} type="radio" id="petFriendlyYes" name="petFriendly" value="1" checked={brState.petFriendly==1} />
                    <label htmlFor="petFriendlyYes" className="mr-4 dark:text-gray-300">Yes</label>
                    <input onChange={handleInput} type="radio" id="petFriendlyNo" name="petFriendly" value="0" checked={brState.petFriendly==0} />
                    <label htmlFor="petFriendlyNo" className="mr-4 dark:text-gray-300">No</label>
                    <input onChange={handleInput} type="radio" id="petFriendlyUnknown" name="petFriendly" value="3" checked={brState.petFriendly==3} />
                    <label htmlFor="petFriendlyUnknown" className="dark:text-gray-300">Unknown</label>
                </div>
            </fieldset>

            <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white p-2 px-4 rounded mb-6 w-full"
                    
                    
                >
                    Save Edit 
                </button>
          
      
        </Form>
    
    </>
  );
}