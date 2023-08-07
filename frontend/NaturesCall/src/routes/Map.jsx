import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";


import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
const containerStyle = {

  width: '100%',
  height: '100vh'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};
export default function Map({ lat, long, setLat, setLong, displayBathrooms }) {
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
      <button><Link to={"/editBathroom/1"}>Edit Bathroom</Link></button>


      <div className="ml-80">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
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


      </div>


    </>
  ) : <>

    <p>Loading...</p>
  </>
}


// export default React.memo(App);



