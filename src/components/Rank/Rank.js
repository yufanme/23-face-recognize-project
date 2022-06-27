import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name}，你使用人脸识别的次数是：`}</div>
      <div className="white f1">{`#${entries}`}</div>
    </div>
  );
};

export default Rank;
