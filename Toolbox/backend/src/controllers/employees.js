const db = require("../db/db");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await db.query("SELECT * FROM employees");

    res.json(employees.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting all employees" });
  }
};

// Use for employee directory search function
const getEmployeeByEmailOrName = async (req, res) => {
  try {
    let query = `SELECT employees.* FROM employees JOIN accounts on employees.account_id = accounts.uuid WHERE 1 = 1`;

    const values = [];

    if (req.query.input !== undefined) {
      query +=
        " AND (accounts.email ilike '%' || $1 || '%' OR employees.first_name ilike '%' || $1 || '%' OR employees.last_name ilike '%' || $1 || '%')";
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

module.exports = {
  getAllEmployees,
  getEmployeeByEmailOrName,
  updateEmployeeDetails,
};
