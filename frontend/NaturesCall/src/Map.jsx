import React  from "react";

import { useState,useEffect } from "react";

import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
const containerStyle = {
  // width:'1600px',
  // height:'1600px'
  width: '100%',
  height: '100vh'
};


export async function  action(){
try {
  // Make the POST request to the backend using fetch
  const response = await fetch('http://localhost:4000/nearby', {
    // http://localhost:4000/{$lat}}
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Parse the response as JSON
  const responseData = await response.json();

  // Do something with the response (if needed)
  console.log("The coordinates were sent: ",responseData);
} catch (error) {
  // Handle errors (if any)
  console.error('Error sending coordinates:', error);
}
};


const center = {
  lat: 40.7128,
  lng: -74.0060
};
export default function Map() {
  const [geocoder, setGeocoder] = useState(null);
  const [lat, setLat]=useState(null);
  const [long, setLong]=useState(null);
  const [address, setAddress]=useState('');

 



  
// map is already set
// 2. grab geocode value and pass this value into the chatgpt onGeocode() function

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    const geocoder = new window.google.maps.Geocoder();
    map.fitBounds(bounds);

    setMap(map)
    setGeocoder(geocoder)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onGeocode = () => {
    //const address = '33 beard street'; // Replace with the address you want to geocode
    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new window.google.maps.Marker({
            position: location,
            map: map,
          });
          // Log the latitude and longitude to the console
        setLat(location.lat())
        setLong(location.lng())
        
        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });
    }
  };
  const data={
    lat,
    long,
  }
  useEffect(() => {
    // Call the action function when the component mounts
    action();
    console.log("lat: ",data.lat)
    console.log("long: ",data.long)
  }, [lat, long]); 
  return isLoaded ? (
    <>
    {/* <NavBar/> */}

    
    <div className="ml-80">
      <GoogleMap
           mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{ lat: 40.7128, lng: -74.0060 }} />

        <></>
      </GoogleMap>
      <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="text-black"
          />
          <button onClick={onGeocode}>Geocode Address</button>
        </div>
      <p>Latitude: {lat}</p>
        <p>Longitude: {long}</p>

      </div>
      

      </>
  ) : <>
  
  <p>Loading...</p>
  </>
}


// export default React.memo(App);


 
