import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all centers
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM centers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET center by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM centers WHERE center_id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Center not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
