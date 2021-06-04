import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = ({ text }) => (
  <div
    className="pin"
    style={{ position: "absolute", transform: "translate(-50%, -71%)" }}
  >
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const { REACT_APP_APIKEY } = process.env;

const Map = ({ initialCenter, pinLat, pinLng, zoomLevel, onClick }) => {
  const _onClick = ({ x, y, lat, lng, event }) => {
    onClick(lat, lng);
  };

  return (
    <div className="map">
      <h2 className="map-h2">Choose Location</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_APIKEY }}
          defaultCenter={initialCenter}
          defaultZoom={zoomLevel}
          onClick={_onClick}
        >
          <LocationPin lat={pinLat} lng={pinLng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
