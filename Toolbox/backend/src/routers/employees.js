const express = require("express");
const {
  getAllEmployees,
  getEmployeeByAccountId,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
  addEmployeeTitles,
  updateEmployeeTitles,
  getEmployeeTitlesByEmail,
  getCurrentTitleByAccountId,
} = require("../controllers/employees");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/search", getEmployeeByEmailOrName);

router.get("/employee/:account_id", getEmployeeByAccountId); //Dashboard > getEmployeeInfo
router.patch("/employee/:account_id", updateEmployeeDetails);
router.put("/employee/titles", addEmployeeTitles);
router.patch("/employee/titles/:uuid", updateEmployeeTitles);
router.get("/employee/titles/search", getEmployeeTitlesByEmail);
router.get("/employee/titles/:account_id", getCurrentTitleByAccountId); //Dashboard > getEmployeeCurrentTitle

module.exports = router;
