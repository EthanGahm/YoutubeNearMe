import React from "react";
import axios from "axios";
import VideoForm from "./Components/VideoForm";
import Header from "./Components/Header";
import Map from "./Components/Map";

const { REACT_APP_APIKEY } = process.env;

const initialPinLocation = {
  lat: 38.0336,
  lng: -78.508,
};

function App() {
  const [pinLat, setPinLat] = React.useState(initialPinLocation.lat);
  const [pinLng, setPinLng] = React.useState(initialPinLocation.lng);

  const openVideo = (lat, lon, rad, sort = "viewCount") => {
    const API_URL =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet" +
      "&location=" +
      lat +
      "%2C" +
      lon +
      "&locationRadius=" +
      rad +
      "mi" +
      "&maxResults=1" +
      "&order=" +
      sort +
      "&type=video" +
      "&key=" +
      REACT_APP_APIKEY;

    axios
      .get(API_URL)
      .then((res) => {
        if (res.data.items.length > 0) {
          let videoID = res.data.items[0].id.videoId;
          let videoURL = "https://www.youtube.com/watch?v=" + videoID;
          window.open(videoURL, "_blank");
        } else {
          alert(
            "No videos within " +
              rad.toString() +
              " miles of location (" +
              lat.toString() +
              ", " +
              lon.toString() +
              ")."
          );
        }
      })
      .catch((err) => console.error(err));
  };

  const setPinLocation = (lat, lng) => {
    setPinLat(lat);
    setPinLng(lng);
  };

  const changeLat = (lat) => {
    setPinLat(parseFloat(lat));
  };

  const changeLng = (lng) => {
    setPinLng(parseFloat(lng));
  };

  return (
    <div className="container">
      <Header />
      <Map
        initialCenter={initialPinLocation}
        onClick={setPinLocation}
        pinLat={pinLat}
        pinLng={pinLng}
        zoomLevel={0}
      />
      <VideoForm
        onFind={openVideo}
        lat={pinLat}
        lng={pinLng}
        changeLat={changeLat}
        changeLng={changeLng}
      />
    </div>
  );
}

export default App;
