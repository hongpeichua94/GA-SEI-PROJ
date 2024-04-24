const express = require("express");
const {
  getAllDepartments,
  addDepartment,
  addDepartmentManager,
  getActiveDepartmentManagers,
} = require("../controllers/departments");

const router = express.Router();

router.get("/departments", getAllDepartments);
router.put("/departments", addDepartment);
router.put("/departments/managers", addDepartmentManager);
router.get("/departments/managers", getActiveDepartmentManagers);

module.exports = router;
