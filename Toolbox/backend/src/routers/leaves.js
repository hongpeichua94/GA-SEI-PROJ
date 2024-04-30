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

const {
  validateAccountIdInBody,
  validateIdInBody,
  validateCreateLeaveRequestData,
  validateUpdateLeaveRequestStatusData,
} = require("../validators/leaves");

const { errorCheck } = require("../validators/errorCheck");

const { authUser, authManager, authAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/leave/request/:account_id", authUser, getLeaveRequestByAccountId); //UpcomingLeave > getLeaveRequest
router.put(
  "/leave/request",
  authUser,
  validateAccountIdInBody,
  validateCreateLeaveRequestData,
  errorCheck,
  createLeaveRequest
); //LeaveRequest > createLeaveRequest
router.delete(
  "/leave/request",
  authUser,
  validateIdInBody,
  errorCheck,
  deleteLeaveRequest
);

router.post("/leave/approval", authManager, getLeaveRequestByDeptManager); //LeavePending > getPendingLeaveRequest
router.patch(
  "/leave/approval",
  authManager,
  validateIdInBody,
  validateUpdateLeaveRequestStatusData,
  errorCheck,
  updateLeaveRequestStatusAndQuota
); //LeavePending > handleApprove/handleReject

router.get("/leaves", authUser, getAllLeaveQuotas);
router.get("/leaves/balance/:account_id", authUser, getLeaveBalaceByAccountId); //LeaveManagement > getLeaveBalance

module.exports = router;
