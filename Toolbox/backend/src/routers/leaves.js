const express = require("express");
const {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getAllLeaveQuotas,
  getLeaveBalaceByAccountId,
} = require("../controllers/leaves");

const router = express.Router();

router.get("/leave/request/:account_id", getLeaveRequestByAccountId);
router.put("/leave/request", createLeaveRequest);
router.delete("/leave/request/:uuid", deleteLeaveRequest);

router.get("/leaves", getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", getLeaveBalaceByAccountId); //LeaveMeanagement > getLeaveBalance

module.exports = router;
