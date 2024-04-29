const db = require("../db/db");

// LEAVE REQUESTS

// To retrieve all request by status and leave type
const getLeaveRequestByAccountId = async (req, res) => {
  try {
    let query = `SELECT a.* FROM leave_requests a JOIN employees b ON a.requestor_id = b.id WHERE account_id = $1`;

    const values = [req.params.account_id];

    let parameterIndex = 2; // Start with the index for the first optional parameter

    if (req.query.leave_type) {
      query += ` AND a.leave_type = $${parameterIndex}`;
      values.push(req.query.leave_type);
      parameterIndex++; // Increment the index for the next optional parameter
    }

    if (req.query.status) {
      query += ` AND a.status = $${parameterIndex}`;
      values.push(req.query.status);
      parameterIndex++; // Increment the index for the next optional parameter
    }

    const requests = await db.query(query, values);
    res.json(requests.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "Error getting employee's leave requests",
    });
  }
};

const createLeaveRequest = async (req, res) => {
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
    const duration = Math.round(
      (new Date(req.body.end_date) - new Date(req.body.start_date)) /
        (1000 * 3600 * 24) +
        1,
      2
    );

    // Create leave requests
    await db.query(
      `INSERT INTO leave_requests (requestor_id, leave_type, start_date, end_date, duration, file_url, remarks, status, dept_manager_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING', $8, NOW(), NOW())`,
      [
        requestorId,
        req.body.leave_type,
        req.body.start_date,
        req.body.end_date,
        duration,
        req.body.file_url,
        req.body.remarks,
        managerId,
      ]
    );
    res.json({ status: "ok", msg: "Leave request created successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error creating leave request" });
  }
};

const deleteLeaveRequest = async (req, res) => {
  try {
    await db.query("DELETE FROM leave_requests WHERE uuid = $1", [
      req.params.uuid,
    ]);
    res.json({ status: "ok", msg: "Leave request deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Failed to delete request" });
  }
};

const getLeaveRequestByDeptManager = async (req, res) => {
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
        a.*,
        to_char(a.start_date, 'YYYY-MM-DD') as start_date_string,
        to_char(a.end_date, 'YYYY-MM-DD') as end_date_string,
        c.first_name || ' ' || c.last_name as requestor_name
      FROM leave_requests a
      JOIN summary b ON a.dept_manager_id = b.dept_manager_id
      JOIN employees c ON a.requestor_id = c.id
      WHERE a.status = 'PENDING'`;

    const value = [req.body.account_id];

    const pending = await db.query(query, value);
    console.log(pending.rows);
    res.json(pending.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting leave pending approval" });
  }
};

// LEAVE QUOTAS
const getAllLeaveQuotas = async (req, res) => {
  try {
    const quota = await db.query("SELECT * FROM leave_quotas");

    res.json(quota.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting all leave quotas" });
  }
};

// To retrieve leave balance by leave type
const getLeaveBalaceByAccountId = async (req, res) => {
  try {
    const balance = await db.query(
      `SELECT b.account_id, a.employee_id, a.leave_type, a.quota, (a.quota-a.used) as balance, year FROM leave_quotas a JOIN employees b ON a.employee_id = b.id WHERE account_id = $1`,
      [req.params.account_id]
    );

    res.json(balance.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting all leave quotas" });
  }
};

module.exports = {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveRequestByAccountId,
  getLeaveRequestByDeptManager,
  getAllLeaveQuotas,
  getLeaveBalaceByAccountId,
};
