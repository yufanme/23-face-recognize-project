import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { useState } from "react";
// import TsParticles from "./components/TsParticles/TsParticles";

function App() {
  const [imageLink, setImageLink] = useState("");
  const [boundingPositions, setBoundingPositions] = useState([]);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  function onInput(event) {
    setBoundingPositions([]);
    setImageLink(event.target.value);
  }

  // reset all state to initial state when logout
  function initState() {
    setImageLink("");
    setBoundingPositions([]);
    setRoute("signin");
    setUser({});
  }

  function onButtonSubmit() {
    fetch("http://localhost:3000/imageURL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageLink: imageLink,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // get all position of face and restore the position data to boxes.
        const regions = response.outputs[0].data.regions;
        const boxes = [];
        regions.forEach((region) => {
          const singleBoundingBox = region.region_info.bounding_box;
          singleBoundingBox.bottom_row = 1 - singleBoundingBox.bottom_row;
          singleBoundingBox.right_col = 1 - singleBoundingBox.right_col;
          boxes.push(singleBoundingBox);
        });
        setBoundingPositions(boxes);
        // add one entry to this user.
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
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
      {/* <TsParticles /> */}
      <Navigation
        onChangeRoute={onChangeRoute}
        route={route}
        initState={initState}
      />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInput={onInput} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition
            imageLink={imageLink}
            boundingPositions={boundingPositions}
          />
        </div>
      ) : route === "signin" ? (
        <Signin onChangeRoute={onChangeRoute} loadUser={loadUser} />
      ) : (
        <Register onChangeRoute={onChangeRoute} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
