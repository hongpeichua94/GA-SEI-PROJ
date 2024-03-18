import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favourites.module.css";

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
        <h5>{props.name}</h5>
        <img src={props.gifUrl} alt={props.name} loading="lazy"></img>
        <div className={styles.row}>
          <button className={`col-md-4 ${styles.tagbodypart}`}>
            {props.bodyPart}
          </button>
          <div className="col-md-1"></div>
          <button className={`col-md-4 ${styles.tagtarget}`}>
            {props.target}
          </button>
        </div>
      </Link>
      <div className={styles.row}>
        <button className={styles.delbtn} onClick={removeFavourite}>
          Remove from Favourites
        </button>
      </div>
    </div>
  );
};

export default FavouritesCard;
