const express = require("express");
const {
  getAllAccounts,
  getAccountByAccountId,
  getAccountByEmail,
  updateAccountDetails,
} = require("../controllers/accounts");

const router = express.Router();

router.get("/accounts", getAllAccounts);
router.get("/accounts/:uuid", getAccountByAccountId); //NavBar > getAccountInfo
router.get("/accounts/search", getAccountByEmail);
router.patch("/accounts/:uuid", updateAccountDetails);

module.exports = router;
