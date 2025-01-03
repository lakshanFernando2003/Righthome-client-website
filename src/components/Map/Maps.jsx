import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { sanitizeNumber, sanitizeString } from "../../utils/sanitize";

const Maps = ({ latitude, longitude, zoom = 15, markerTitle, width , height }) => {
  // Sanitize inputs
  const sanitizedLat = sanitizeNumber(latitude);
  const sanitizedLng = sanitizeNumber(longitude);
  const sanitizedTitle = sanitizeString(markerTitle);

  const mapContainerStyle = {
    width: width ,
    height: height,
  };

  const mapWrapperStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAGW-7hz-HCQlgiYUFZ9YQDqcsAhKSIx9c",
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <div style={{ height: height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>;
  }

  return (
    <div style={mapWrapperStyle}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: sanitizedLat, lng: sanitizedLng }}
        zoom={zoom}
        options={{
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
          gestureHandling: 'cooperative'
        }}
      >
        <Marker
          position={{ lat: sanitizedLat, lng: sanitizedLng }}
          title={sanitizedTitle}
        />
      </GoogleMap>
    </div>
  );
};

Maps.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  markerTitle: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Maps;
