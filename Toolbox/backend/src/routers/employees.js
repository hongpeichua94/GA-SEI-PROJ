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

const {
  validateIdInParam,
  validateUpdateEmployeeData,
  validateAddEmployeeTitleData,
  validateUpdateEmployeeTitleData,
} = require("../validators/employees");

const { errorCheck } = require("../validators/errorCheck");

const { authUser, authAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/employees", authUser, getAllEmployees);
router.get("/employee/:account_id", authUser, getEmployeeByAccountId); //Dashboard > getEmployeeInfo
router.get("/employees/search", authUser, getEmployeeByEmailOrName); //Directory > getAllEmployeeInfo
router.patch(
  "/employee/:account_id",
  authUser,
  validateIdInParam,
  validateUpdateEmployeeData,
  errorCheck,
  updateEmployeeDetails
); //Profile > updateEmployeeDetails
router.put(
  "/employee/titles",
  authAdmin,
  validateAddEmployeeTitleData,
  errorCheck,
  addEmployeeTitles
);
router.patch(
  "/employee/titles/:uuid",
  authAdmin,
  validateUpdateEmployeeTitleData,
  errorCheck,
  updateEmployeeTitles
);
router.get("/employee/titles/search", authUser, getEmployeeTitlesByEmail);
router.get(
  "/employee/titles/:account_id",
  authUser,
  getEmployeeTitleByAccountId
); //Dashboard/Profile> getEmployeeCurrentTitle; Profile > getEmployeeTitles

module.exports = router;
