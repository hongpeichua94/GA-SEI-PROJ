import React from "react";
import { Link } from "react-router-dom";
import styles from "./FavouritesCard.module.css";

const FavouritesCard = (props) => {
  const removeFavourite = async () => {
    const res = await fetch(
      "https://api.airtable.com/v0/appIlGtCLc9ElGJsL/favourite_exercises/" +
        props.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_AIRTABLE_API_TOKEN,
        },
      }
    );

    if (res.ok) {
      props.getFavourites();
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/exercise/${props.eid}`}>
        <img src={props.gifUrl} alt={props.name} loading="lazy"></img>
        <div className="row">
          <button className={`col-md-4 btn btn-primary ${styles.tag}`}>
            {props.bodyPart}
          </button>
          <div className="col-md-1"></div>
          <button className="col-md-4 btn btn-secondary">{props.target}</button>
          <div className="row">
            <h5>{props.name}</h5>
          </div>
        </div>
      </Link>
      <button className="btn btn-danger" onClick={removeFavourite}>
        Remove from Favourites
      </button>
    </div>
  );
};

export default FavouritesCard;
