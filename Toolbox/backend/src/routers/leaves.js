const express = require("express");
const {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getAllLeaveQuotas,
} = require("../controllers/leaves");

const router = express.Router();

router.get("/leaves/request/:account_id", getLeaveRequestByAccountId);
router.put("/leaves/request/:account_id", createLeaveRequest);
router.delete("/leaves/request/:uuid", deleteLeaveRequest);

router.get("/leaves", getAllLeaveQuotas);

module.exports = router;
