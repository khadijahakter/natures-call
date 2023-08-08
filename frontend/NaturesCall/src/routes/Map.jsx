import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";


import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";




const center = {
  lat: 40.7128,
  lng: -74.0060
};

export default function Map({ lat, long, setLat, setLong,displayBathrooms }) {
  

  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState('');



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {


    const bounds = new window.google.maps.LatLngBounds(center);
    const geocoder = new window.google.maps.Geocoder();
    map.fitBounds(bounds);

    setMap(map)
    setGeocoder(geocoder)
  }, [])

  const onUnmount = React.useCallback(function () {
    setMap(null);
  }, []);


  //converts address to coordinates

  const onGeocode = () => {

    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {

        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);



          //add the coordinates to the state
          setLat(location.lat())
          setLong(location.lng())

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
  // {
  //   "featureType": "road",
  //   "elementType": "geometry",
  //   "stylers": [
  //     { "color": "#fae37d" }
  //   ]
  // },
  // {
  //   "featureType": "poi",
  //   "elementType": "geometry",
  //   "stylers": [
  //     { "color": "#176B87" }
  //   ]
  // },
  // {
  //   "featureType": "transit",
  //   "stylers": [
  //     { "color": "#176B87" }
  //   ]
  // },
  // {
  //   "elementType": "labels.text.stroke",
  //   "stylers": [
  //     { "visibility": "on" },
  //     { "color": "#DAFFFB" }
  //   ]
  // },
  // {
  //   "elementType": "labels.text",
  //   "stylers": [
  //     { "saturation": -1 },
  //     // { "color": "#DAFFFB" }
  //   ]
  // },
  // {
  //   "elementType": "labels.icon",
  //   "stylers": [
  //     { "visibility": "on" }
  //   ]
  // }
];



return isLoaded ? (
  <>
  
    <div className= "relative w-full ">

    <div className="search absolute top-2 left-1/4 z-10 p-2 rounded w-2/4 bg-cyan-300 bg-opacity-40 overflow-hidden ">
    <div className="flex items-center bg-cyan-700 rounded ">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
        className="px-4 py-2 flex-grow text-white bg-cyan-900 bg-opacity-90"
      />
      <button onClick={onGeocode} className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold  py-2 px-4 rounded-r">
        Find Bathrooms
      </button>
    </div>
    {/* <p className="text-white">Latitude: {lat}</p>
    <p className="text-white">Longitude: {long}</p> */}
  </div>


      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ styles: blueMapStyles }}
        >
          { /* Took bathroom list from parent component and added a marker in their positions */}
          {displayBathrooms.map((displayBathroom) => (
            <Marker
              key={displayBathroom.id}
              position={{ lat: parseFloat(displayBathroom.lat), lng: parseFloat(displayBathroom.lng) }}
            // icon={createCustomMarkerIcon("#FF0000")} 

          />
        ))}
        <></>

        </GoogleMap>

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


