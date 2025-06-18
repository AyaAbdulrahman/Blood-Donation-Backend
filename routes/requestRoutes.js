import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all blood requests
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM requests ORDER BY request_id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new blood request
router.post("/", async (req, res) => {
  const { center_id, blood_type, units_needed } = req.body;

  const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Validation
  if (!center_id || !blood_type || units_needed === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!validBloodTypes.includes(blood_type)) {
    return res.status(400).json({ error: "Invalid blood type" });
  }

  if (typeof units_needed !== "number" || units_needed <= 0) {
    return res.status(400).json({ error: "units_needed must be a positive number" });
  }

  try {
    const result = await db.query(
      `INSERT INTO requests (center_id, blood_type, units_needed)
       VALUES ($1, $2, $3) RETURNING *`,
      [center_id, blood_type, units_needed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET urgent blood requests (e.g., more than 5 units needed)
router.get("/urgent", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM requests WHERE units_needed >= $1 ORDER BY units_needed DESC",
      [5] // Threshold for "urgent"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching urgent requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET a single request by ID  ??
router.get("/:request_id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM requests WHERE request_id = $1", [req.params.request_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching request:", err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;
