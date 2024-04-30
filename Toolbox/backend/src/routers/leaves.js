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

const { authUser, authManager, authAdmin } = require("../middleware/auth");

router.get("/leave/request/:account_id", authUser, getLeaveRequestByAccountId); //UpcomingLeave > getLeaveRequest
router.put("/leave/request", authUser, createLeaveRequest); //LeaveRequest > createLeaveRequest
router.delete("/leave/request", authUser, deleteLeaveRequest);

router.post("/leave/approval", authManager, getLeaveRequestByDeptManager); //LeavePending > getPendingLeaveRequest
router.patch("/leave/approval", authManager, updateLeaveRequestStatusAndQuota); //LeavePending > handleApprove/handleReject

router.get("/leaves", authUser, getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", authUser, getLeaveBalaceByAccountId); //LeaveManagement > getLeaveBalance

module.exports = router;
