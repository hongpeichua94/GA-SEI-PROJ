const { body, param } = require("express-validator");

const validateIdInParam = [
  param("account_id", "Account ID is invalid").isLength({ min: 36, max: 36 }),
];

const validateUpdateEmployeeData = [
  body("postal_code", "Postal code must be a 6-digit number")
    .optional()
    .isLength({ min: 6, max: 6 })
    .isNumeric(),
  body("phone", "Invalid phone number").optional().isMobilePhone(),
  body("email", "Invalid email address").optional().isEmail(),
];

const validateAddEmployeeTitleData = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "Invalid email address").isEmail(),
  body("department", "Department name is required").not().isEmpty(),
  body("title", "Title is required").not().isEmpty(),
  body("start_date", "Start date is required").not().isEmpty(),
  body("start_date", "Invalid start date").isISO8601(),
];

const validateUpdateEmployeeTitleData = [
  param("uuid", "Invalid uuid").isLength({ min: 36, max: 36 }),
  body("status", "Status is required").not().isEmpty(),
  body("end_date", "End date is required").not().isEmpty(),
  body("end_date", "Invalid start date").isISO8601(),
];

module.exports = {
  validateIdInParam,
  validateUpdateEmployeeData,
  validateAddEmployeeTitleData,
  validateUpdateEmployeeTitleData,
};
