import axios from "axios";
import key from "./YoutubeAPIKey";
import VideoForm from "./Components/VideoForm";
import Header from "./Components/Header";

function App() {
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
      key;

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

  return (
    <div className="container">
      <Header />
      <VideoForm onFind={openVideo} />
    </div>
  );
}

export default App;
