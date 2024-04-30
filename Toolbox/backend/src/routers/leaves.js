const express = require("express");
const {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getLeaveRequestByDeptManager,
  updateLeaveRequestStatusAndQuota,
  getAllLeaveQuotas,
  getLeaveBalaceByAccountId,
} = require("../controllers/leaves");

const router = express.Router();

router.get("/leave/request/:account_id", getLeaveRequestByAccountId); //UpcomingLeave > getLeaveRequest
router.put("/leave/request", createLeaveRequest); //LeaveRequest > createLeaveRequest
router.delete("/leave/request", deleteLeaveRequest);

router.post("/leave/approval", getLeaveRequestByDeptManager); //LeavePending > getPendingLeaveRequest
router.patch("/leave/approval", updateLeaveRequestStatusAndQuota); //LeavePending > handleApprove/handleReject

router.get("/leaves", getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", getLeaveBalaceByAccountId); //LeaveManagement > getLeaveBalance

module.exports = router;
