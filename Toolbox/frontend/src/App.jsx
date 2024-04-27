import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import UserContext from "./context/user";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Directory from "./pages/Directory";
import LeaveManagement from "./pages/LeaveManagement";
import NotFound from "./pages/NotFound";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [role, setRole] = useState("");

  const userContextValue = {
    accessToken,
    setAccessToken,
    accountId,
    setAccountId,
    role,
    setRole,
  };

  //converting accessToken value to a boolean to see if user is logged in
  const isLoggedIn = !!accessToken;

  return (
    <UserContext.Provider value={userContextValue}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard accountId={accountId} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/directory" element={<Directory />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
