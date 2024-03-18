import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Favourites from "./pages/Favourites";
// import FindTrainer from "./pages/FindTrainer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="exercise/:id" element={<ExerciseDetail />} />
        <Route path="favourites" element={<Favourites />} />
        {/* <Route path="personal-trainer" element={<FindTrainer />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
