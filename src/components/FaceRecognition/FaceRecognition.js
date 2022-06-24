import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ imageLink, boundingPositions }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageLink} alt="" width="500px" height="auto" />
        {boundingPositions.map((boundingPosition) => {
          return (
            <div
              className="bounding-box"
              style={{
                inset: `${boundingPosition.top_row * 100}% ${
                  boundingPosition.right_col * 100
                }% ${boundingPosition.bottom_row * 100}% ${
                  boundingPosition.left_col * 100
                }%`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default FaceRecognition;
