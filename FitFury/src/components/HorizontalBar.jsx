import React from "react";
import BodyPart from "./BodyPart";

const HorizontalBar = (props) => {
  return (
    <div className="row">
      {props.data.map((item) => (
        <BodyPart
          key={props.id}
          item={item}
          bodyPart={props.bodyPart}
          setBodyPart={props.setBodyPart}
        ></BodyPart>
      ))}
    </div>
  );
};

export default HorizontalBar;
