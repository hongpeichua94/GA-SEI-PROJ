const express = require("express");

const {
  getExpensesByAccountId,
  createExpenseRequest,
  deleteExpenseRequest,
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
); //LeaveRequest > createLeaveRequest
router.delete(
  "/expense/submit",
  authUser,
  // validateIdInBody,
  // errorCheck,
  deleteExpenseRequest
);

module.exports = router;
