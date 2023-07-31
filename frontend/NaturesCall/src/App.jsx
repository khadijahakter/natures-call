import React  from "react";
import NavBar from "./routes/NavBar";
import { useState } from "react";
import Popup from "./routes/Popup";
import { GoogleMap, useJsApiLoader,Marker } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '100vh'
};


const center = {
  lat: 40.7128,
  lng: -74.0060
};
function App() {

 

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

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
      </div>
      

      </>
  ) : <>
  
  <p>Loading...</p>
  </>
}

export default React.memo(App);
 
