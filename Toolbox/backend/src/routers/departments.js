const express = require("express");
const {
  getAllDepartments,
  addDepartment,
} = require("../controllers/departments");

const router = express.Router();

router.get("/departments", getAllDepartments);
router.put("/departments", addDepartment);

module.exports = router;
