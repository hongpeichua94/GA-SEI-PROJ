const express = require("express");
const {
  getAllEmployees,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
} = require("../controllers/employees");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/search", getEmployeeByEmailOrName);
router.patch("/employee/:account_id", updateEmployeeDetails);

module.exports = router;
