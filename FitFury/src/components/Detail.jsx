import React from "react";

import BodyPartImage from "../assets/weights.png";

const Detail = (props) => {
  //props
  //exerciseDetail
  return (
    <img
      src={props.gifUrl}
      alt={props.name}
      Loading="lazy"
      className="detail-image"
    />
  );
};

export default Detail;
