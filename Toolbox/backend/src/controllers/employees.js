const db = require("../db/db");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await db.query(`
    SELECT 
      b.*, a.title, 
      c.name as department_name, 
      to_char(b.date_of_birth,'YYYY-MM-DD') as date_of_birth_string,  
      to_char(b.joined_date,'YYYY-MM-DD') as joined_date_string 
    FROM employee_titles a 
    JOIN employees b on a.employee_id = b.id 
    JOIN departments c on a.department_id = c.id 
    WHERE a.status = 'ACTIVE'`);
    res.json(employees.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting all employees" });
  }
};

const getEmployeeByAccountId = async (req, res) => {
  try {
    const employee = await db.query(
      "SELECT *, to_char(date_of_birth,'YYYY-MM-DD') as date_of_birth_string, to_char(joined_date,'YYYY-MM-DD') as joined_date_string FROM employees WHERE account_id = $1",
      [req.params.account_id]
    );
    res.json(employee.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting employee" });
  }
};

// Use for employee directory search function
const getEmployeeByEmailOrName = async (req, res) => {
  try {
    // let query = `SELECT employees.* FROM employees JOIN accounts on employees.account_id = accounts.uuid WHERE 1 = 1`;

    let query = `
      WITH employee_summary as (
        SELECT 
          b.email as work_email, 
          a.*, 
          concat(a.first_name, ' ', a.last_name) as employee_name,
          c.title, 
          c.department_id
        FROM employees a
        JOIN accounts b ON a.account_id = b.uuid 
        JOIN employee_titles c ON a.id = c.employee_id
        WHERE c.status = 'ACTIVE'
      )

      SELECT 
        a.*,
        b.name as department_name
      FROM employee_summary a
      JOIN departments b ON a.department_id = b.id
      WHERE 1=1`;

    const values = [];

    if (req.query.input !== undefined) {
      query +=
        " AND (work_email ilike '%' || $1 || '%' OR first_name ilike '%' || $1 || '%' OR last_name ilike '%' || $1 || '%')";
      values.push(req.query.input);
    }

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting employee details" });
  }
};

// Update employee details by account_id (params)
const updateEmployeeDetails = async (req, res) => {
  try {
    const updateDetails = {};
    const queryParams = [];

    if ("address" in req.body) {
      updateDetails.address = req.body.address;
      queryParams.push(updateDetails.address);
    }
    if ("country" in req.body) {
      updateDetails.country = req.body.country;
      queryParams.push(updateDetails.country);
    }
    if ("postal_code" in req.body) {
      updateDetails.postal_code = req.body.postal_code;
      queryParams.push(updateDetails.postal_code);
    }
    if ("phone" in req.body) {
      updateDetails.phone = req.body.phone;
      queryParams.push(updateDetails.phone);
    }
    if ("email" in req.body) {
      updateDetails.email = req.body.email;
      queryParams.push(updateDetails.email);
    }
    if ("status" in req.body) {
      updateDetails.status = req.body.status;
      queryParams.push(updateDetails.status);
    }
    if ("resigned_date" in req.body) {
      updateDetails.resigned_date = req.body.resigned_date;
      queryParams.push(updateDetails.resigned_date);
    }
    if ("profile_picture_url" in req.body) {
      updateDetails.profile_picture_url = req.body.profile_picture_url;
      queryParams.push(updateDetails.profile_picture_url);
    }

    if (queryParams.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    queryParams.push(req.params.account_id);

    const updateQuery = `
    UPDATE employees 
    SET 
      ${Object.keys(updateDetails)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ")},
      updated_at = now()
    WHERE account_id = $${queryParams.length}`;

    const result = await db.query(updateQuery, queryParams);

    if (result.rowCount === 1) {
      res
        .status(200)
        .json({ message: "Employee details updated successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Employee not found or no changes were made" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Failed to update employee details" });
  }
};

// EMPLOYEE TITLES
const addEmployeeTitles = async (req, res) => {
  try {
    // Retrieve the employee id based on accounts email
    const employeeResult = await db.query(
      "SELECT id FROM employees JOIN accounts ON employees.account_id = accounts.uuid WHERE accounts.email = $1",
      [req.body.email]
    );

    if (employeeResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Employee does not exist" });
    }

    const employeeId = employeeResult.rows[0].id;

    // Retrieve the department_id based on the department name
    const departmentResult = await db.query(
      "SELECT id FROM departments WHERE name = $1",
      [req.body.department]
    );

    if (departmentResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Department does not exist" });
    }

    const departmentId = departmentResult.rows[0].id;

    await db.query(
      `INSERT INTO employee_titles (employee_id, title, start_date, department_id, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [employeeId, req.body.title, req.body.start_date, departmentId, "ACTIVE"]
    );
    res.json({ status: "ok", msg: "Employee titles created successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error adding new employee titles" });
  }
};

// Update employee titles by uuid (params)
const updateEmployeeTitles = async (req, res) => {
  try {
    const updateQuery = `
      UPDATE employee_titles 
      SET 
        status = $1,
        end_date = $2,
        updated_at = NOW()
      WHERE 
        uuid = $3`;

    // Execute the update query with parameters
    await db.query(updateQuery, [
      req.body.status,
      req.body.end_date,
      req.params.uuid,
    ]);

    res
      .status(200)
      .json({ status: "success", msg: "Employee title updated successfully" });
  } catch (error) {
    console.error("Error updating employee title:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

// Use to populate employee title history?
const getEmployeeTitlesByEmail = async (req, res) => {
  try {
    let query = `SELECT employee_titles.* FROM employees JOIN employee_titles on employees.id = employee_titles.employee_id JOIN accounts on employees.account_id = accounts.uuid WHERE 1 = 1`;

    const values = [];

    if (req.query.input !== undefined) {
      query += " AND accounts.email ilike '%' || $1 || '%'";
      values.push(req.query.input);
    }

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting employee titles" });
  }
};

const getEmployeeTitleByAccountId = async (req, res) => {
  try {
    let query = `
    WITH summary AS ( 
      SELECT 
        b.*,
        to_char(b.start_date,'YYYY-MM-DD') as start_date_string,
        to_char(b.end_date,'YYYY-MM-DD') as end_date_string
      FROM employees a
      JOIN employee_titles b on a.id = b.employee_id 
      JOIN accounts c on a.account_id = c.uuid 
      WHERE a.account_id = $1`;

    const values = [req.params.account_id];

    if (req.query.status) {
      query += ` AND b.status = $2`;
      values.push(req.query.status);
    }
    query += `) 
      SELECT 
        summary.*,
        departments.name as department_name
      FROM summary
      LEFT JOIN departments on summary.department_id = departments.id`;

    const employee = await db.query(query, values);
    res.json(employee.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting employee" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeByAccountId,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
  addEmployeeTitles,
  updateEmployeeTitles,
  getEmployeeTitlesByEmail,
  getEmployeeTitleByAccountId,
};
