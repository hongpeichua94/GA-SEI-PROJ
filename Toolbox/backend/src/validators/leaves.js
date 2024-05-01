const { body, validationResult } = require("express-validator");
const dayjs = require("dayjs");

const validateAccountIdInBody = [
  body("account_id", "Account ID is invalid").isLength({ min: 36, max: 36 }),
];

const validateIdInBody = [
  body("uuid", "Leave request uuid is invalid").isLength({ min: 36, max: 36 }),
];

const validateCreateLeaveRequestData = [
  body("leave_type", "Leave type is required").not().isEmpty(),
  body("start_date", "Start date is required").not().isEmpty(),
  body("start_date", "Invalid start date").isISO8601(),
  body("end_date", "End date is required").not().isEmpty(),
  body("end_date", "Invalid end date").isISO8601(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { start_date, end_date } = req.body;
    const today = dayjs();

    if (dayjs(start_date).isBefore(today, "day")) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Start date must be today or later" }] });
    }

    if (dayjs(end_date).isBefore(start_date, "day")) {
      return res.status(400).json({
        errors: [
          { msg: "End date must be the same as or later than start date" },
        ],
      });
    }

    next();
  },
];

const validateUpdateLeaveRequestStatusData = [
  body("status", "Status is required").not().isEmpty(),
];

module.exports = {
  validateAccountIdInBody,
  validateIdInBody,
  validateCreateLeaveRequestData,
  validateUpdateLeaveRequestStatusData,
};
