import React  from "react";

import { useState } from "react";

import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
const containerStyle = {
  width:'400px',
  height:'400px'
  // width: '100%',
  // height: '100vh'
};


const center = {
  lat: 40.7128,
  lng: -74.0060
};
function App() {
  const [geocoder, setGeocoder] = useState(null);
  
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
    const address = '33 beard street'; // Replace with the address you want to geocode
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
        console.log('Latitude:', location.lat());
        console.log('Longitude:', location.lng());
        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });
    }
  };
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
      <button onClick={onGeocode}>Geocode</button>

      </div>
      

      </>
  ) : <>
  
  <p>Loading...</p>
  </>
}





export default React.memo(App);


 
