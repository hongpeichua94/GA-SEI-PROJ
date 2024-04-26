const express = require("express");
const {
  getAllEmployees,
  getEmployeeByAccountId,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
  addEmployeeTitles,
  updateEmployeeTitles,
  getEmployeeTitlesByEmail,
} = require("../controllers/employees");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/search", getEmployeeByEmailOrName);

router.get("/employee/:account_id", getEmployeeByAccountId);
router.patch("/employee/:account_id", updateEmployeeDetails);
router.put("/employee/titles", addEmployeeTitles);
router.patch("/employee/titles/:uuid", updateEmployeeTitles);
router.get("/employee/titles/search", getEmployeeTitlesByEmail);

module.exports = router;
