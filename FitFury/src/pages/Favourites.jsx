import React, { useEffect, useState } from "react";
import FavouritesCard from "../components/FavouritesCard";
import styles from "../components/Favourites.module.css";

const Favourites = () => {
  const [currentFavourites, setCurrentFavourites] = useState([]);

  useEffect(() => {
    getFavourites();
  }, []); // Fetch favourites on component mount

  const getFavourites = async () => {
    try {
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
        setCurrentFavourites(data.records);
      } else {
        console.log("Failed to fetch favourites");
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Favourite Exercises</h1>
      {currentFavourites.map((item) => {
        const { id, fields } = item;
        return (
          <FavouritesCard
            key={id}
            id={id}
            eid={fields.id}
            name={fields.name}
            gifUrl={fields.gifUrl}
            target={fields.target}
            bodyPart={fields.bodyPart}
            equipment={fields.equipment}
            getFavourites={getFavourites}
            currentFavourites={currentFavourites}
          ></FavouritesCard>
        );
      })}
    </div>
  );
};

export default Favourites;
