const { body, validationResult } = require("express-validator");
const dayjs = require("dayjs");

const validateAccountIdInBody = [
  body("account_id", "Account ID is invalid").isLength({ min: 36, max: 36 }),
];

const validateIdInBody = [
  body("uuid", "Expense request uuid is invalid").isLength({
    min: 36,
    max: 36,
  }),
];

const validateCreateExpenseRequestData = [
  body("category", "Category is required").not().isEmpty(),
  body("expense_date", "Expense date is required").not().isEmpty(),
  body("expense_date", "Invalid expense date").isISO8601(),
];

const validateUpdateExpenseRequestStatusData = [
  body("status", "Status is required").not().isEmpty(),
];

module.exports = {
  validateAccountIdInBody,
  validateIdInBody,
  validateCreateExpenseRequestData,
  validateUpdateExpenseRequestStatusData,
};
