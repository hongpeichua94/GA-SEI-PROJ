import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import UserContext from "./context/user";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Directory from "./pages/Directory";
import LeaveManagement from "./pages/LeaveManagement";
import LeaveRequest from "./pages/LeaveRequest";
import LeavePending from "./pages/LeavePending";
import Expense from "./pages/Expense";
import ExpenseSubmit from "./pages/ExpenseSubmit";
import ExpensePending from "./pages/ExpensePending";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

// SCRIPTS
import { getEmployeeInfo, getEmployeeCurrentTitle } from "./scripts/api";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [role, setRole] = useState("");

  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeCurrentTitle, setEmployeeCurrentTitle] = useState({});

  const userContextValue = {
    accessToken,
    setAccessToken,
    accountId,
    setAccountId,
    role,
    setRole,
  };

  const fetchEmployeeData = async () => {
    const employeeInfo = await getEmployeeInfo(accountId, accessToken);
    setEmployeeDetails(employeeInfo);
  };

  const fetchEmployeeCurrentTitle = async () => {
    const employeeCurrentTitle = await getEmployeeCurrentTitle(
      accountId,
      accessToken
    );
    setEmployeeCurrentTitle(employeeCurrentTitle);
  };

  useEffect(() => {
    if (accountId) {
      fetchEmployeeData(accountId, accessToken);
      fetchEmployeeCurrentTitle(accountId, accessToken);
    }
  }, [accountId, accessToken]);

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
          path="/profile/:account_id"
          element={
            isLoggedIn ? (
              <Profile
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/directory" element={<Directory />} />
        <Route
          path="/leave/:account_id"
          element={
            isLoggedIn ? (
              <LeaveManagement
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/leave/apply"
          element={
            isLoggedIn ? (
              <LeaveRequest
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/leave/pending"
          element={
            isLoggedIn ? (
              <LeavePending
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/expense/:account_id"
          element={
            isLoggedIn ? (
              <Expense
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/expense/submit"
          element={
            isLoggedIn ? (
              <ExpenseSubmit
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/expense/pending"
          element={
            isLoggedIn ? (
              <ExpensePending
                fetchEmployeeData={fetchEmployeeData}
                fetchEmployeeCurrentTitle={fetchEmployeeCurrentTitle}
                employeeDetails={employeeDetails}
                employeeCurrentTitle={employeeCurrentTitle}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/knowledge-base"
          element={isLoggedIn ? <ComingSoon /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            <Admin
              setEmployeeDetails={setEmployeeDetails}
              employeeDetails={employeeDetails}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
