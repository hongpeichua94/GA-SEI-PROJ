const db = require("../db/db");
const bcrypt = require("bcrypt");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await db.query("SELECT * FROM accounts");

    res.json(accounts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting accounts" });
  }
};

const getAccountByAccountId = async (req, res) => {
  try {
    const account = await db.query("SELECT * FROM accounts WHERE uuid = $1", [
      req.params.uuid,
    ]);
    res.json(account.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting account" });
  }
};

// Use for account search function
const getAccountByEmail = async (req, res) => {
  try {
    let query = `WITH account_summary AS (
      SELECT
        b.*,
        concat(a.first_name, ' ', a.last_name) as employee_name,
        c.title,
        c.department_id
      FROM employees a
      JOIN accounts b ON a.account_id = b.uuid
      JOIN employee_titles c on a.id = c.employee_id
        WHERE b.email = $1
          AND c.status ='ACTIVE'
      )
      
      SELECT
        account_summary.*,
        departments.name as department_name
      FROM account_summary
      JOIN departments on account_summary.department_id = departments.id`;

    const value = [req.body.email];

    const account = await db.query(query, value);
    res.json(account.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting account" });
  }
};

// Update account details by uuid (params)
const updateAccountDetails = async (req, res) => {
  try {
    const updateDetails = {};
    const queryParams = [];

    if ("role" in req.body) {
      updateDetails.role = req.body.role;
      queryParams.push(updateDetails.role);
    }
    if ("access_admin_console" in req.body) {
      updateDetails.access_admin_console = req.body.access_admin_console;
      queryParams.push(updateDetails.access_admin_console);
    }
    if ("access_account_info" in req.body) {
      updateDetails.access_account_info = req.body.access_account_info;
      queryParams.push(updateDetails.access_account_info);
    }
    if ("access_employee_directory" in req.body) {
      updateDetails.access_employee_directory =
        req.body.access_employee_directory;
      queryParams.push(updateDetails.access_employee_directory);
    }
    if ("access_leave_management" in req.body) {
      updateDetails.access_leave_management = req.body.access_leave_management;
      queryParams.push(updateDetails.access_leave_management);
    }
    if ("access_expense_tracker" in req.body) {
      updateDetails.access_expense_tracker = req.body.access_expense_tracker;
      queryParams.push(updateDetails.access_expense_tracker);
    }
    if ("access_knowledge_base" in req.body) {
      updateDetails.access_knowledge_base = req.body.access_knowledge_base;
      queryParams.push(updateDetails.access_knowledge_base);
    }

    if ("password" in req.body) {
      const hash = await bcrypt.hash(req.body.password, 12);
      queryParams.push(hash);
    }
    if ("status" in req.body) {
      updateDetails.status = req.body.status;
      queryParams.push(updateDetails.status);
    }

    if (queryParams.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    queryParams.push(req.params.uuid);

    const updateQuery = `
    UPDATE accounts 
    SET 
      ${Object.keys(updateDetails)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ")},
      updated_at = now()
    WHERE uuid = $${queryParams.length}`;

    const result = await db.query(updateQuery, queryParams);

    if (result.rowCount === 1) {
      res.status(200).json({ message: "Account details updated successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Account not found or no changes were made" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Failed to update accounts details" });
  }
};

module.exports = {
  getAllAccounts,
  getAccountByAccountId,
  getAccountByEmail,
  updateAccountDetails,
};
