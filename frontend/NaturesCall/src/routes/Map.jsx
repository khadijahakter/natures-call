import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
const containerStyle = {
  // width:'1600px',
  // height:'1600px'
  width: '100%',
  height: '100vh'
};





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
  
//converts address to coordinates
  const onGeocode = () => {
    //const address = '33 beard street'; // Replace with the address you want to geocode
    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          // new window.google.maps.Marker({
          //   position: location,
          //   map: map,
          // });
          // Log the latitude and longitude to the console
          setLat(location.lat())
          setLong(location.lng())

        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });
    }
  };


  return isLoaded ? (
    <>
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="text-black"
        />
        <button onClick={onGeocode}>Find Bathrooms</button>
      </div>
      <p>Latitude: {lat}</p>
      <p>Longitude: {long}</p>
      <button><Link to={"/addBathroom"}>Add Bathroom</Link></button>


      <div className="ml-80">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {displayBathrooms.map((displayBathroom) => (
          <Marker
            key={displayBathroom.id}
            position={{ lat: parseFloat(displayBathroom.lat), lng: parseFloat(displayBathroom.lng) }}
          />
        ))}
         

          <></>
        </GoogleMap>


      </div>


    </>
  ) : <>

    <p>Loading...</p>
  </>
}


// export default React.memo(App);



