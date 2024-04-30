const express = require("express");
const {
  getAllEmployees,
  getEmployeeByAccountId,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
  addEmployeeTitles,
  updateEmployeeTitles,
  getEmployeeTitlesByEmail,
  getEmployeeTitleByAccountId,
} = require("../controllers/employees");

const router = express.Router();

const { authUser, authAdmin } = require("../middleware/auth");

router.get("/employees", authUser, getAllEmployees);
router.get("/employee/:account_id", authUser, getEmployeeByAccountId); //Dashboard > getEmployeeInfo
router.get("/employees/search", authUser, getEmployeeByEmailOrName); //Directory > getAllEmployeeInfo
router.patch("/employee/:account_id", authUser, updateEmployeeDetails); //Profile > updateEmployeeDetails
router.put("/employee/titles", authAdmin, addEmployeeTitles);
router.patch("/employee/titles/:uuid", authAdmin, updateEmployeeTitles);
router.get("/employee/titles/search", authUser, getEmployeeTitlesByEmail);
router.get(
  "/employee/titles/:account_id",
  authUser,
  getEmployeeTitleByAccountId
); //Dashboard/Profile> getEmployeeCurrentTitle; Profile > getEmployeeTitles

module.exports = router;
