const db = require("../db/db");

const getAllDepartments = async (req, res) => {
  try {
    const departments = await db.query("SELECT * FROM departments");

    res.json(departments.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting all departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    await db.query(
      `INSERT INTO departments (name, created_at, updated_at) VALUES ($1, NOW(), NOW())`,
      [req.body.name]
    );
    res.json({ status: "ok", msg: "Department created successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error adding new department" });
  }
};

// DEPARTMENT MANAGERS
const addDepartmentManager = async (req, res) => {
  try {
    // Retrieve the employee_id based on work email
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
      `INSERT INTO department_managers (employee_id, department_id, start_date, status, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [employeeId, departmentId, req.body.start_date, "ACTIVE"]
    );
    res.json({ status: "ok", msg: "Department manager created successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error adding new department manager" });
  }
};

const getActiveDepartmentManagers = async (req, res) => {
  try {
    const managers = await db.query(
      "SELECT a.*, concat(b.first_name,' ',b.last_name) as name, c.name as department FROM department_managers a JOIN employees b on a.employee_id = b.id JOIN departments c on a.department_id = c.id WHERE a.status = 'ACTIVE'"
    );

    res.json(managers.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "Error getting current department managers",
    });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  addDepartmentManager,
  getActiveDepartmentManagers,
};
