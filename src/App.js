import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { useState, useEffect } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "583569cd329c42f9ba2d8c275778a27c",
});

function App() {
  const [imageLink, setImageLink] = useState("");
  const [boundingPositions, setBoundingPositions] = useState([]);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  function onInput(event) {
    setBoundingPositions([]);
    setImageLink(event.target.value);
  }

  function onButtonSubmit() {
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // THE JPG
        imageLink
      )
      .then((response) => {
        const regions = response.outputs[0].data.regions;
        const boxes = [];
        regions.forEach((region) => {
          const singleBoundingBox = region.region_info.bounding_box;
          singleBoundingBox.bottom_row = 1 - singleBoundingBox.bottom_row;
          singleBoundingBox.right_col = 1 - singleBoundingBox.right_col;
          boxes.push(singleBoundingBox);
        });
        setBoundingPositions(boxes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onChangeRoute(currentRoute) {
    setRoute(currentRoute);
  }

  function loadUser(currentUser) {
    setUser({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      entries: currentUser.entries,
      joined: currentUser.joined,
    });
  }

  return (
    <div className="App">
      <Navigation onChangeRoute={onChangeRoute} route={route} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInput={onInput} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition
            imageLink={imageLink}
            boundingPositions={boundingPositions}
          />
        </div>
      ) : route === "signin" ? (
        <Signin onChangeRoute={onChangeRoute} />
      ) : (
        <Register onChangeRoute={onChangeRoute} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
