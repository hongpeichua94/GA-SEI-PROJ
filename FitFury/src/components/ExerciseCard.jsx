import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExerciseCard.module.css";

const ExerciseCard = (props) => {
  return (
    <div className={styles.card}>
      <Link to={`/exercise/${props.exercise.id}`}>
        <img
          src={props.exercise.gifUrl}
          alt={props.exercise.name}
          loading="lazy"
        ></img>
        <div className="row">
          <div className="col-md-1"></div>
          <button className={`col-md-4 btn btn-primary ${styles.tag}`}>
            {props.exercise.bodyPart}
          </button>
          <div className="col-md-1"></div>
          <button className="col-md-4 btn btn-secondary">
            {props.exercise.target}
          </button>
        </div>
      </Link>
      <br />
      <div className="row">
        <h5>{props.exercise.name}</h5>
      </div>
    </div>
  );
};

export default ExerciseCard;
