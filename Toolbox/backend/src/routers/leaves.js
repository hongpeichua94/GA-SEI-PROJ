const express = require("express");
const {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getAllLeaveQuotas,
  getLeaveBalaceByAccountId,
} = require("../controllers/leaves");

const router = express.Router();

router.get("/leaves/request/:account_id", getLeaveRequestByAccountId);
router.put("/leaves/request/:account_id", createLeaveRequest);
router.delete("/leaves/request/:uuid", deleteLeaveRequest);

router.get("/leaves", getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", getLeaveBalaceByAccountId); //LeaveMeanagement > getLeaveBalance

module.exports = router;
