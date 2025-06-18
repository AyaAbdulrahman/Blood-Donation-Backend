import express from "express";
import db from "../db.js";
const router = express.Router();

// SIGNUP for donors only (centers are added manually for now)
router.post("/signup", async (req, res) => {
  const { full_name, email, phone_number, password, blood_type, location } = req.body;

  try {
    const exists = await db.query("SELECT * FROM donors WHERE email = $1", [email]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Donor already exists" });
    }

    const result = await db.query(
      `INSERT INTO donors (full_name, email, phone_number, password, blood_type, location)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, email, phone_number, password, blood_type, location]
    );

    res.status(201).json({ user: result.rows[0], role: "donor" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// LOGIN for both donor or center
router.post("/signin", async (req, res) => {
  const { credential, password, role } = req.body;

  try {
    let query, user;

    if (role === "donor") {
      query = await db.query("SELECT * FROM donors WHERE email = $1 AND password = $2", [credential, password]);
      user = query.rows[0];
      
    } else if (role === "center") {
      query = await db.query("SELECT * FROM centers WHERE center_name = $1 AND password = $2", [credential, password]);
      user = query.rows[0];
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ user, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});


// very temp to add center manually as there is no admin
// router.post("/add-center", async (req, res) => {
//   const { center_name, password, center_phone_number, location } = req.body;

//   try {
//     const exists = await db.query("SELECT * FROM centers WHERE center_name = $1", [center_name]);
//     if (exists.rows.length > 0) {
//       return res.status(400).json({ message: "Center already exists" });
//     }

//     const result = await db.query(
//       `INSERT INTO centers (center_name, password, center_phone_number, location)
//        VALUES ($1, $2, $3, $4) RETURNING *`,
//       [center_name, password, center_phone_number, location]
//     );

//     res.status(201).json({ center: result.rows[0] });
//   } catch (err) {
//     console.error("Center insert error:", err);
//     res.status(500).json({ message: "Center insert failed" });
//   }
// });

export default router;
