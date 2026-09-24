const express = require('express');
const router = express.Router();
const db = require('../database/db');

/**
 * GET /api/reviews/render
 * Reflected XSS vulnerability in review preview generator (CWE-79)
 */
router.get('/render', (req, res) => {
  const author = req.query.author || 'Anonymous Shopper';
  const comment = req.query.comment || 'Great Prime delivery!';

  // VULNERABLE CODE (Direct HTML reflection without escaping):
  const htmlResponse = `
    <div class="user-review-card" style="padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;">
      <div style="font-weight: bold; color: #007185;">Verified Scamazon Customer: ${author}</div>
      <div style="margin-top: 6px; color: #333;">${comment}</div>
    </div>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlResponse);
});

/**
 * POST /api/reviews
 * Submit customer review
 */
router.post('/', (req, res) => {
  const { productId, author, rating, comment } = req.body;
  if (!productId || !comment) {
    return res.status(400).json({ status: 'error', message: 'productId and comment are required' });
  }

  const review = db.addReview(productId, author || 'Verified Customer', rating || 5, comment);
  res.json({ status: 'success', review });
});

module.exports = router;
