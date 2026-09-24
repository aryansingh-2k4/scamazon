const express = require('express');
const router = express.Router();
const db = require('../database/db');

/**
 * GET /api/products
 * Fetch all catalog products
 */
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    total: db.getAllProducts().length,
    products: db.getAllProducts()
  });
});

/**
 * GET /api/products/search
 * Search products by keyword
 * VULNERABILITY: SQL Injection via raw string concatenation (CWE-89)
 */
router.get('/search', async (req, res) => {
  const searchTerm = req.query.q || '';

  try {
    // VULNERABLE CODE (Triggers Sentinel SAST CWE-89 & DAST SQLi payloads):
    const sql = "SELECT * FROM products WHERE name LIKE '%" + searchTerm + "%' OR description LIKE '%" + searchTerm + "%'";
    const results = await db.query(sql);

    res.json({
      status: 'success',
      query: searchTerm,
      sqlExecuted: sql,
      count: results.length,
      products: results
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

/**
 * GET /api/products/:id
 * Retrieve product details
 */
router.get('/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ status: 'error', message: 'Product not found' });
  }
  const reviews = db.getReviews(req.params.id);
  res.json({ status: 'success', product, reviews });
});

module.exports = router;
