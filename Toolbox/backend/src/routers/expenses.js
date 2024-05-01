const express = require("express");

const {
  getExpensesByAccountId,
  createExpenseRequest,
  deleteExpenseRequest,
  getExpenseRequestByDeptManager,
  updateExpenseRequestStatus,
} = require("../controllers/expenses");

const { authUser, authManager, authAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/expense/:account_id", getExpensesByAccountId); //Expense > getMyExpense
router.put(
  "/expense/submit",
  authUser,
  // validateAccountIdInBody,
  // validateCreateLeaveRequestData,
  // errorCheck,
  createExpenseRequest
); //ExpenseSubmit > createExpenseRequest
router.delete(
  "/expense/submit",
  authUser,
  // validateIdInBody,
  // errorCheck,
  deleteExpenseRequest
);

router.post("/expense/approval", authManager, getExpenseRequestByDeptManager); //ExpensePending > getPendingExpenseRequest
router.patch(
  "/expense/approval",
  authManager,
  //   validateIdInBody,
  //   validateUpdateLeaveRequestStatusData,
  //   errorCheck,
  updateExpenseRequestStatus
); //ExpensePending > handleApprove/handleReject

module.exports = router;
