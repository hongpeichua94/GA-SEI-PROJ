const express = require("express");

const {
  getExpensesByAccountId,
  createExpenseRequest,
  deleteExpenseRequest,
  getExpenseRequestByDeptManager,
  updateExpenseRequestStatus,
  getExpenseSummaryByAccountId,
} = require("../controllers/expenses");

const {
  validateAccountIdInBody,
  validateIdInBody,
  validateCreateExpenseRequestData,
  validateUpdateExpenseRequestStatusData,
} = require("../validators/expenses");

const { errorCheck } = require("../validators/errorCheck");

const { authUser, authManager, authAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/expense/:account_id", getExpensesByAccountId); //Expense > getMyExpense
router.put(
  "/expense/submit",
  authUser,
  validateAccountIdInBody,
  validateCreateExpenseRequestData,
  errorCheck,
  createExpenseRequest
); //ExpenseSubmit > createExpenseRequest
router.delete(
  "/expense/submit",
  authUser,
  validateIdInBody,
  errorCheck,
  deleteExpenseRequest
);
router.post("/expense/approval", authManager, getExpenseRequestByDeptManager); //ExpensePending > getPendingExpenseRequest
router.patch(
  "/expense/approval",
  authManager,
  validateIdInBody,
  validateUpdateExpenseRequestStatusData,
  errorCheck,
  updateExpenseRequestStatus
); //ExpensePending > handleApprove/handleReject
router.get(
  "/expense/summary/:account_id",
  authUser,
  getExpenseSummaryByAccountId
); //LeaveManagement > getLeaveBalance

module.exports = router;
