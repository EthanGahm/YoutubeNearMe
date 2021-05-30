import { useState } from "react";

const FindVideo = ({ onFind }) => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [rad, setRad] = useState(5);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !lat ||
      !lon ||
      isNaN(lat) ||
      isNaN(lon) ||
      Math.abs(parseFloat(lat)) > 90 ||
      Math.abs(parseFloat(lon)) > 180
    ) {
      alert("Invalid parameters!");
      return;
    }

    onFind(lat, lon, rad);
  };

  return (
    <form className="video-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Latitude</label>
        <input
          type="text"
          placeholder="Enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Longitude</label>
        <input
          type="text"
          placeholder="Enter Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
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
        type="submit"
        value="Find My Video"
        style={{ backgroundColor: "red" }}
      />
    </form>
  );
};

export default FindVideo;
