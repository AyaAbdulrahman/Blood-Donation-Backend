import express from "express";
import db from "../db.js";
const router = express.Router();

// Book appointment
router.post("/", async (req, res) => {
  const { user_id, center_id, appointment_date, type } = req.body;
  const result = await db.query(
    "INSERT INTO appointments (user_id, center_id, appointment_date, type) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, center_id, appointment_date, type]
  );
  res.status(201).json(result.rows[0]);
});

// user
router.get("/user/:user_id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM appointments WHERE user_id = $1", 
      [req.params.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//center
router.get("/center/:center_id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM appointments WHERE center_id = $1", 
      [req.params.center_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET appointments for a specific donor
router.get("/", async (req, res) => {
  const { user_id } = req.body;
  console.log(req);
  
  if (!user_id) {
    return res.status(400).json({ error: "Donor ID is required" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_date",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
