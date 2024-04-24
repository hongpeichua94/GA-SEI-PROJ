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

module.exports = {
  getAllDepartments,
  addDepartment,
};
