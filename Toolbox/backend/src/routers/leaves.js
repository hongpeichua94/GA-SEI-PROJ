const express = require("express");
const {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getLeaveRequestByDeptManager,
  getAllLeaveQuotas,
  getLeaveBalaceByAccountId,
} = require("../controllers/leaves");

const router = express.Router();

router.get("/leave/request/:account_id", getLeaveRequestByAccountId); //UpcomingLeave > getLeaveRequest
router.put("/leave/request", createLeaveRequest); //LeaveRequest > createLeaveRequest
router.delete("/leave/request/:uuid", deleteLeaveRequest);

router.post("/leave/approval", getLeaveRequestByDeptManager);

router.get("/leaves", getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", getLeaveBalaceByAccountId); //LeaveManagement > getLeaveBalance

module.exports = router;
