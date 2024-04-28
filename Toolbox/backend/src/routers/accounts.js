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
router.post("/accounts/search", getAccountByEmail); //Admin > onSearch
router.patch("/accounts/:uuid", updateAccountDetails); //Admin

module.exports = router;
