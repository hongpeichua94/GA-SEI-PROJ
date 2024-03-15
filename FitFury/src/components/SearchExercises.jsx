import React from "react";
import { useEffect, useState } from "react";
import styles from "./SearchExercises.module.css";
import HorizontalBar from "./HorizontalBar";

const SearchExercises = (props) => {
  const [search, setSearch] = useState("");
  //const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  const exercisesOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      "X-RapidAPI-Key": import.meta.env.API_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const getData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  };

  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await getData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exercisesOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await getData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=500",
        exercisesOptions
      );

      console.log("exercises");
      console.log(exercisesData);
      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search)
      );

      setSearch("");
      props.setExercises(searchedExercises);
    }
  };

  return (
    <div className={styles.searchbar}>
      <h2>PLACEHOLDER SOME TEXT</h2>
      <input
        value={search}
        onChange={handleChange}
        placeholder="Search Exercises"
        type="text"
      ></input>
      <button className="search-btn btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      <br />
      <HorizontalBar
        data={bodyParts}
        bodyPart={props.bodyPart}
        setBodyPart={props.setBodyPart}
      ></HorizontalBar>
    </div>
  );
};

export default SearchExercises;
