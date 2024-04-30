const express = require("express");
const {
  getAllAccounts,
  getAccountByAccountId,
  getAccountByEmail,
  updateAccountDetails,
} = require("../controllers/accounts");

const router = express.Router();

const { errorCheck } = require("../validators/errorCheck");
const { authUser, authAdmin } = require("../middleware/auth");

router.get("/accounts", getAllAccounts);
router.get("/accounts/:uuid", authUser, getAccountByAccountId); //NavBar > getAccountInfo
router.post("/accounts/search", authAdmin, getAccountByEmail); //Admin > onSearch
router.patch("/accounts/:uuid", authAdmin, updateAccountDetails); //Admin > onChange

module.exports = router;
