import React, { useEffect } from "react";
import { useState,useRef } from "react";

import { Link } from "react-router-dom";




import { GoogleMap, useJsApiLoader, Marker,Autocomplete,
  DirectionsRenderer, InfoWindow} from "@react-google-maps/api";


import './MapStyles.css';
import StarRating from "./StarRating"; 


import customMarkerIcon from "./bathroomMarker(unclicked).png"; 

const center = {
  lat: 40.587400,
  lng: -74.148660
};

const libraries = ["places"];
export default function Map({ selectedBathroom, lat,long, setLat, setLong,displayBathrooms }) {
  
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState('');

/** @type React.MutableRefObject<HTMLInputElement> */
const originRef = useRef()
/** @type React.MutableRefObject<HTMLInputElement> */
const destiantionRef = useRef()





  const [selected, setSelected] = useState(null);

  
 

  const [center, setCenter] = useState({ lat: 40.587400, lng: -74.148660 });



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,

  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    const geocoder = new window.google.maps.Geocoder();
    map.fitBounds(bounds);
  
    setMap(map);
    setGeocoder(geocoder);
  
 
  }, []);
 

  const onUnmount = React.useCallback(function () {
    setMap(null);
  }, []);


  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return;
    // }
  
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: `${lat},${long}`, // User's location
      destination: `${selectedBathroom.lat},${selectedBathroom.lng}`, // Marker's address
      travelMode: window.google.maps.TravelMode.WALKING,
    });
  
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
  //geocoder API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
  
            if (data.results.length > 0) {
              const address = data.results[0].formatted_address;
              console.log("my address:", address);
              setLat(latitude);
              setLong(longitude);
              //originRef.current.value = address;
              //console.log("originRef.current.value:", originRef.current.value);
              
            }
          } catch (error) {
            console.error("Error getting address from coordinates:", error);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  //useEffect(getUserLocation,[])

  useEffect(() => {
    if(selectedBathroom){
      calculateRoute()
    }
  }, [selectedBathroom]);
  


  //converts address to coordinates

  const onGeocode = () => {
    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);

          // Update center based on geocoded location
          setCenter({ lat: location.lat(), lng: location.lng() });

          // Update lat and long states
          setLat(location.lat());
          setLong(location.lng());
        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });
    }
  };



  
const containerStyle = {
  // width:'1600px',
  // height:'1600px'
  width: '100%',
  height: '90vh',
  backgroundColor : 'white'
};


const blueMapStyles = [
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#70b0ce" }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      { "color": "##E5ECE4" }
    ]
  },
  
];
// function onMarkerClick(markerAddress) {
//   if (originRef.current.value !== null) {
    
//     destiantionRef.current.value = markerAddress;
//     calculateRoute();
//   } else {
//     console.log("Don't have your location");
//   }
// }




return isLoaded ? (
  
  <>
  
    <div className= "relative w-full ">
    <button 
    onClick={getUserLocation} 
   //  onClick={handleFindNearbyClick}
    className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold  py-2 px-4 rounded-r">
        Find Nearby Bathrooms
      </button>






    <div className="search absolute top-2 left-1/4 z-10 p-2 rounded w-2/4 bg-cyan-300 bg-opacity-40 overflow-hidden ">
    <div className="flex items-center bg-cyan-700 rounded ">
      <Autocomplete>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
        className="px-4 py-2 flex-grow text-white bg-cyan-900 bg-opacity-90"
      />
      </Autocomplete>
      <button onClick={onGeocode} className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold  py-2 px-4 rounded-r">
        Find Bathrooms
      </button>
    </div>
    {/* <p className="text-white">Latitude: {lat}</p>
    <p className="text-white">Longitude: {long}</p> */}
  </div>


      <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <text>Distance: {distance} </text>
          <text>Duration: {duration} </text>
          <button onClick={clearRoute}>Clear Routes</button>
          <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: blueMapStyles }}
    >
      {/* Render DirectionsRenderer only if directionsResponse exists */}
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

      {/* Map over displayBathrooms to render Markers */}
      {displayBathrooms.map((displayBathroom) => (
        <Marker
          key={displayBathroom.id}
          position={{ lat: parseFloat(displayBathroom.lat), lng: parseFloat(displayBathroom.lng) }}
          onClick={() => setSelected(displayBathroom)}

          // icon={customMarkerIcon} // Set the custom icon
        />
      ))}

        {/* Render InfoWindow if selectedBathroom exists */}
        {selected && (
              <InfoWindow
                position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="info-window">
                  <h4>{selected.name}</h4>
                  <div className="rating">
                    <StarRating rating={selected.rating} /> {/* Use the StarRating component */}
                  </div>
                  <Link to={`/bathrooms/${selected.id}`}>View Details</Link>
                </div>
              </InfoWindow>
            )}
    </GoogleMap>
        
        {/* <Autocomplete>
              <input type='text' placeholder='Origin' ref={originRef} className="text-black" />
            </Autocomplete>
            <Autocomplete>
              <input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                className="text-black"
              />
            </Autocomplete> */}

            {/* <button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </button> */}
            

        <div className="absolute bottom-7 right-20 z-10">

          {/* <button><Link to={"/editBathroom"}>Edit Bathroom</Link></button> */}
        <Link to={"/addBathroom"}>Add Bathroom
          <button className="bg-sky-900 text-white rounded-full p-4 hover:bg-blue-800 focus:outline-none">
          Add Bathroom</button></Link>
        </div>
      </div>

    </div>
  </>
) : <>

  <p>Loading...</p>
</>

}


// export default React.memo(App);


