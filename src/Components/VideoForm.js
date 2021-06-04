import React, { useState } from "react";

const FindVideo = ({ onFind, lat, lng, changeLat, changeLng }) => {
  const [rad, setRad] = useState(5);
  const [localLat, setLocalLat] = useState(lat);
  const [localLng, setLocalLng] = useState(lng);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      if (localLat && !isNaN(localLat)) {
        if (localLat < -89.9) {
          changeLat(-90);
        } else if (localLat > 90) {
          changeLat(90);
        } else {
          changeLat(localLat);
        }
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [localLat, changeLat]);

  React.useEffect(() => {
    const delay = setTimeout(() => {
      if (localLng && !isNaN(localLng)) {
        if (localLng < -180) {
          changeLng(-180);
        } else if (localLng > 180) {
          changeLng(180);
        } else {
          changeLng(localLng);
        }
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [localLng, changeLng]);

  React.useEffect(() => {
    setLocalLat(lat);
  }, [lat]);

  React.useEffect(() => {
    setLocalLng(lng);
  }, [lng]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !lat ||
      !lng ||
      isNaN(lat) ||
      isNaN(lng) ||
      Math.abs(parseFloat(lat)) > 90 ||
      Math.abs(parseFloat(lng)) > 180
    ) {
      alert("Invalid parameters!");
      return;
    }

    onFind(lat, lng, rad);
  };

  return (
    <form className="videoForm">
      <div className="form-control">
        <label>Latitude</label>
        <input
          type="text"
          placeholder="Enter Latitude"
          value={localLat}
          onChange={(e) => setLocalLat(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Longitude</label>
        <input
          type="text"
          placeholder="Enter Longitude"
          value={localLng}
          onChange={(e) => setLocalLng(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Radius: {rad} miles</label>
        <input
          type="range"
          min="1"
          max="100"
          value={rad}
          onChange={(e) => setRad(e.target.value)}
        />
      </div>
      <input
        className="button button-block"
        type="button"
        value="Find My Video"
        style={{ backgroundColor: "red" }}
        onClick={onSubmit}
      />
    </form>
  );
};

export default FindVideo;
