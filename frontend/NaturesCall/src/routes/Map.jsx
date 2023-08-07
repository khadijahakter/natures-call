import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


const center = {
  lat: 40.7128,
  lng: -74.0060
};
export default function Map({ lat, long, setLat, setLong,displayBathrooms }) {
  
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState('');


  



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

  const onUnmount = React.useCallback(function () {
    setMap(null);
  }, []);
  

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

  // const createCustomMarkerIcon = (color) => {
  //   return {
  //     path: google.maps.SymbolPath.CIRCLE,
  //     fillColor: color, // Change this to the desired color
  //     fillOpacity: 1.0,
  //     scale: 1.5, // Adjust the size of the icon as per your requirement
  //   };
  // };

  
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
          { /* Child components, such as markers, info windows, etc. */}
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
          <button className="bg-sky-900 text-white rounded-full p-4 hover:bg-blue-800 focus:outline-none">
          Add Bathroom</button>
        </div>
      </div>

    </div>
  </>
) : <>

  <p>Loading...</p>
</>

}


// export default React.memo(App);



