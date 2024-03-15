import React, { useEffect, useState } from "react";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import { useParams } from "react-router-dom";

const ExerciseDetail = () => {
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

  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      // const youtubeSearchUrl =
      //   "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await getData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exercisesOptions
      );
      console.log(exerciseDetailData);
      setExerciseDetail(exerciseDetailData);
    };
    fetchExercisesData();
  }, [id]); //recall function whenever ID changes

  return (
    <div>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideo />
    </div>
  );
};

export default ExerciseDetail;
