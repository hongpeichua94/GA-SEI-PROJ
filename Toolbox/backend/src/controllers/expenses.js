const db = require("../db/db");

const getExpensesByAccountId = async (req, res) => {
  try {
    let query = `
        SELECT 
            a.*,
            to_char(a.expense_date, 'YYYY-MM-DD') as expense_date_string,
            to_char(a.created_at, 'YYYY-MM-DD') as created_at_string
        FROM expense_requests a 
        JOIN employees b ON a.requestor_id = b.id 
        WHERE account_id = $1`;

    const values = [req.params.account_id];

    let parameterIndex = 2; // Start with the index for the first optional parameter

    if (req.query.category) {
      query += ` AND a.category = $${parameterIndex}`;
      values.push(req.query.category);
      parameterIndex++; // Increment the index for the next optional parameter
    }

    if (req.query.status) {
      query += ` AND a.status = $${parameterIndex}`;
      values.push(req.query.status);
      parameterIndex++; // Increment the index for the next optional parameter
    }

    const expense = await db.query(query, values);
    res.json(expense.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "Error getting employee's expenses",
    });
  }
};

const createExpenseRequest = async (req, res) => {
  try {
    const requestorResult = await db.query(
      "SELECT id as employee_id, department_id FROM employees JOIN employee_titles ON employees.id = employee_titles.employee_id WHERE account_id = $1",
      [req.body.account_id]
    );

    const requestorId = requestorResult.rows[0].employee_id;
    const departmentId = requestorResult.rows[0].department_id;

    const managerResult = await db.query(
      "SELECT uuid as dept_manager_id FROM department_managers WHERE status = 'ACTIVE' AND department_id = $1",
      [departmentId]
    );

    const managerId = managerResult.rows[0].dept_manager_id;

    // Create expense request
    await db.query(
      `INSERT INTO expense_requests (requestor_id, category, expense_date, amount, file_url, remarks, status, dept_manager_id, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, 'PENDING', $7, NOW(), NOW())`,
      [
        requestorId,
        req.body.category,
        req.body.expense_date,
        req.body.amount,
        req.body.file_url,
        req.body.remarks,
        managerId,
      ]
    );
    res.json({ status: "ok", msg: "Expense request created successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error creating expense request" });
  }
};

const deleteExpenseRequest = async (req, res) => {
  try {
    await db.query("DELETE FROM expense_requests WHERE uuid = $1", [
      req.body.uuid,
    ]);
    res.json({ status: "ok", msg: "Expense request deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Failed to delete expense" });
  }
};

const getExpenseRequestByDeptManager = async (req, res) => {
  try {
    let query = `WITH summary as (
        SELECT 
          a.id,
          a.account_id,
          b.department_id,
          b.uuid as dept_manager_id,
          b.status
        FROM employees a
        JOIN department_managers b ON a.id = b.employee_id
        WHERE b.status = 'ACTIVE'
          AND a.account_id = $1
      )
      
        SELECT 
          to_char(a.created_at, 'YYYY-MM-DD') as created_at_string,
          a.*,
          to_char(a.expense_date, 'YYYY-MM-DD') as expense_date_string,
          c.first_name || ' ' || c.last_name as requestor_name
        FROM expense_requests a
        JOIN summary b ON a.dept_manager_id = b.dept_manager_id
        JOIN employees c ON a.requestor_id = c.id
        WHERE a.status = 'PENDING'`;

    const value = [req.body.account_id];

    const pending = await db.query(query, value);
    console.log(pending.rows);
    res.json(pending.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "Error getting expenses pending approval",
    });
  }
};

const updateExpenseRequestStatus = async (req, res) => {
  try {
    const updateExpenseRequestQuery = `
        UPDATE expense_requests
        SET
            status = $1,
            updated_at = NOW()
        WHERE uuid = $2`;

    // Update expense request status
    await db.query(updateExpenseRequestQuery, [req.body.status, req.body.uuid]);

    res.status(200).json({
      status: "success",
      msg: "Expense request updated successfully",
    });
  } catch (error) {
    console.error("Error updating expense request:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const getExpenseSummaryByAccountId = async (req, res) => {
  try {
    let query = `
            SELECT
                a.status,
                sum(a.amount) as total_amount
            FROM expense_requests a
            JOIN employees b ON a.requestor_id = b.id 
            WHERE account_id = $1
            GROUP BY 1`;

    const value = [req.params.account_id];

    const summary = await db.query(query, value);
    res.json(summary.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "Error getting employee's expenses overview",
    });
  }
};

module.exports = {
  getExpensesByAccountId,
  createExpenseRequest,
  deleteExpenseRequest,
  getExpenseRequestByDeptManager,
  updateExpenseRequestStatus,
  getExpenseSummaryByAccountId,
};
