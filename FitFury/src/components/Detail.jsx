import React, { useState } from "react";

const Detail = (props) => {
  // const [favourites, setFavourites] = useState([]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Favourites");

  const getFavourites = async () => {
    const res = await fetch(
      "https://api.airtable.com/v0/appIlGtCLc9ElGJsL/favourite_exercises",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_AIRTABLE_API_TOKEN,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      // props.setFavourites(data);
    }
  };

  const addFavourites = async () => {
    setButtonDisabled(true);
    setButtonText("Added to Favourites");

    const id = props.exerciseDetail.id;
    const name = props.exerciseDetail.name;
    const gifUrl = props.exerciseDetail.gifUrl;
    const target = props.exerciseDetail.target;
    const bodyPart = props.exerciseDetail.bodyPart;
    const equipment = props.exerciseDetail.equipment;

    const res = await fetch(
      "https://api.airtable.com/v0/appIlGtCLc9ElGJsL/favourite_exercises",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_AIRTABLE_API_TOKEN,
        },
        body: JSON.stringify({
          fields: {
            id: id,
            name: name,
            gifUrl: gifUrl,
            target: target,
            bodyPart: bodyPart,
            equipment: equipment,
          },
        }),
      }
    );

    if (res.ok) {
      getFavourites();
    } else {
      console.log("an error has occured");
    }
    console.log("added");
  };

  return (
    <div className="container">
      <div className="row">
        <img
          src={props.exerciseDetail.gifUrl}
          alt={props.exerciseDetail.name}
          id="detail-image"
        />
      </div>
      <div className="row">
        <h1>{props.exerciseDetail.name}</h1>
        <p>{props.exerciseDetail.instructions}</p>
        <p>Target: {props.exerciseDetail.target}</p>
        <p>Equipment: {props.exerciseDetail.equipment}</p>
        <button
          className={buttonDisabled ? "btn btn-secondary" : "btn btn-primary"}
          onClick={addFavourites}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Detail;
