import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all campaigns
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM campaigns');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// GET single campaign by ID
router.get('/:campaign_id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM campaigns WHERE campaign_id = $1',
      [req.params.campaign_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching campaign:', err);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { center_id, title, info } = req.body;
    
    // Validation
    if (!center_id || !title || !info) {
      return res.status(400).json({ 
        error: "Missing center_id, title, or info" 
      });
    }

    const result = await db.query(
      `INSERT INTO campaigns (center_id, title, info) 
       VALUES ($1, $2, $3) RETURNING *`,
      [center_id, title, info]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Failed to create campaign",
      details: err.message 
    });
  }
});

// PUT update campaign
router.put('/:campaign_id', async (req, res) => {
  try {
    const { title, info } = req.body;
    const result = await db.query(
      'UPDATE campaigns SET title = $1, info = $2 WHERE campaign_id = $3 RETURNING *',
      [title, info, req.params.campaign_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// DELETE campaign
router.delete('/:campaign_id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM campaigns WHERE campaign_id = $1 RETURNING *',
      [req.params.campaign_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    console.error('Error deleting campaign:', err);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

export default router;