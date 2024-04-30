const express = require("express");
const {
  getAllDepartments,
  addDepartment,
  addDepartmentManager,
  getActiveDepartmentManagers,
} = require("../controllers/departments");

const router = express.Router();

const { authUser, authAdmin } = require("../middleware/auth");

router.get("/departments", authUser, getAllDepartments);
router.put("/departments", authAdmin, addDepartment);
router.put("/departments/managers", authAdmin, addDepartmentManager);
router.get("/departments/managers", authUser, getActiveDepartmentManagers);

module.exports = router;
