import React from "react";
import styles from "./HorizontalBar.module.css";
import icon from "../assets/weights.png";

const BodyPart = (props) => {
  const handleFilter = () => {
    props.setBodyPart(props.item);
    console.log(props.item);
  };

  return (
    <div
      className={`${styles.horizontalbar}`}
      type="button"
      onClick={handleFilter}
    >
      <img src={icon} alt="weights"></img>
      <p>{props.item}</p>
    </div>
  );
};

export default BodyPart;
