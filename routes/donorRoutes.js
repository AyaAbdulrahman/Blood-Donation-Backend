import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all donors
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM donors');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET donor by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM donors WHERE user_id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Donor not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE new donor like sign up
router.post('/', async (req, res) => {
  const { full_name, email, phone_number, password, blood_type, last_donated, location } = req.body;

  if (!full_name || !email || !phone_number|| !password || !blood_type || !last_donated || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO donors (full_name, email, phone_number, password, blood_type, last_donated, location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, email, phone_number, password, blood_type, last_donated, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE donor info for edit profile 
// UPDATE donor info
router.put('/:id', async (req, res) => {
  const { full_name, email, phone_number, password, blood_type, last_donated, location } = req.body;

  // Validate all fields
  if (!full_name || !email || !phone_number || !password || !blood_type || !last_donated || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `UPDATE donors 
       SET full_name = $1, email = $2, phone_number = $3, password = $4, 
           blood_type = $5, last_donated = $6, location = $7 
       WHERE user_id = $8 RETURNING *`,
      [full_name, email, phone_number, password, blood_type, last_donated, location, req.params.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Donor not found' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE donor like delete account
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM donors WHERE user_id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Donor not found' });
    res.json({ message: 'Donor deleted', donor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
