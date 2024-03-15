import React, { useEffect, useState } from "react";
import styles from "./Exercises.module.css";
import ExerciseCard from "./ExerciseCard";
import Pagination from "@mui/material/Pagination";
import BodyPart from "./BodyPart";

const Exercises = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = props.exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

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

  useEffect(() => {
    const getExercisesData = async () => {
      let exercisesData = [];

      if (props.bodyPart === "all") {
        exercisesData = await getData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=500",
          exercisesOptions
        );
      } else {
        exercisesData = await getData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${props.bodyPart}`,
          exercisesOptions
        );
      }

      props.setExercises(exercisesData);
    };

    getExercisesData();
  }, [props.bodyPart]);

  return (
    <div className={styles.exercises} id="exercises">
      <h3>Showing Results</h3>
      <div className={styles.group}>
        {currentExercises.map((item, idx) => (
          <ExerciseCard key={idx} exercise={item}></ExerciseCard>
        ))}
      </div>
      <div className={styles.pagination}>
        {props.exercises.length > 9 && (
          <Pagination
            count={Math.ceil(props.exercises.length / exercisesPerPage)}
            shape="rounded"
            defaultPage={1}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </div>
    </div>
  );
};

export default Exercises;
