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

router.get("/employees", getAllEmployees);
router.get("/employees/search", getEmployeeByEmailOrName); //Directory > getAllEmployeeInfo

router.get("/employee/:account_id", getEmployeeByAccountId); //Dashboard > getEmployeeInfo
router.patch("/employee/:account_id", updateEmployeeDetails); //Profile > updateEmployeeDetails
router.put("/employee/titles", addEmployeeTitles);
router.patch("/employee/titles/:uuid", updateEmployeeTitles);
router.get("/employee/titles/search", getEmployeeTitlesByEmail);
router.get("/employee/titles/:account_id", getEmployeeTitleByAccountId); //Dashboard/Profile> getEmployeeCurrentTitle; Profile > getEmployeeTitles

module.exports = router;
