const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Admin creates account > generate employee details, title and leave quota
const register = async (req, res) => {
  try {
    const authEmail = await db.query(
      "SELECT * FROM accounts WHERE email = $1",
      [req.body.email]
    );

    if (authEmail.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Email already exists" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    // Register the user in the accounts table
    const accountResult = await db.query(
      "INSERT INTO accounts (email,password) VALUES ($1,$2) RETURNING uuid",
      [req.body.email, hash]
    );

    // Retrieve the uuid of the newly registered user
    const accountId = accountResult.rows[0].uuid;

    // Create an employee entry for the user in the employees table
    const employeeResult = await db.query(
      `INSERT INTO employees (account_id, first_name, last_name, date_of_birth, gender, address, country, postal_code, phone, email, status, joined_date, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,  NOW(), NOW()) RETURNING id, joined_date`,
      [
        accountId,
        req.body.first_name,
        req.body.last_name,
        req.body.date_of_birth,
        req.body.gender,
        req.body.address,
        req.body.country,
        req.body.postal_code,
        req.body.phone,
        req.body.personal_email,
        "ACTIVE",
        req.body.joined_date,
      ]
    );

    // Retrieve the id and joined_date of the newly created employee
    const employeeId = employeeResult.rows[0].id;
    const startDate = employeeResult.rows[0].joined_date;

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

    // Create title details for the employee in the title_details table
    await db.query(
      `INSERT INTO employee_titles (employee_id, title, start_date, department_id, status, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [employeeId, req.body.title, startDate, departmentId, "ACTIVE"]
    );

    // Create leave quota details for the employee in the leave_quotas table
    const leaveTypes = [
      "ANNUAL",
      "SICK",
      "CHILDCARE",
      "MATERNITY",
      "PATERNITY",
    ];
    const quotas = [21, 14, 6, 60, 10];
    const currentYear = new Date(new Date().getFullYear(), 0, 1);

    for (let i = 0; i < leaveTypes.length; i++) {
      await db.query(
        `INSERT INTO leave_quotas (employee_id, leave_type, quota, year, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [employeeId, leaveTypes[i], quotas[i], currentYear]
      );
    }

    res.json({
      status: "ok",
      msg: "Account, employee and leave quota created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await db.query("SELECT * FROM accounts WHERE email = $1", [
      req.body.email,
    ]);
    if (auth.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid email or password" });
    }

    const account = auth.rows[0];
    const result = await bcrypt.compare(req.body.password, account.password);
    if (!result) {
      console.error("Invalid email or password");
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }

    const claims = {
      email: account.email,
      role: account.role,
      loggedInId: account.uuid,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh, account_id: account.uuid, role: account.role });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)

      .json({ status: "error", msg: "Catch Caught: Login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token failed" });
  }
};

module.exports = { register, login, refresh };
