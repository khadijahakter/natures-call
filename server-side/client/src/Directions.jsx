import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const Directions = ({ origin, destination }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [directions, setDirections] = useState(null);

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setDirections(result);
    } else {
      console.error('Error fetching directions:', status);
    }
  };

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={8}
    >
      {directions && <DirectionsRenderer directions={directions} />}
      <DirectionsService
        options={{
          destination: destination,
          origin: origin,
          travelMode: 'DRIVING'
        }}
        callback={directionsCallback}
      />
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
};

export default Directions;
