const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');

/**
 * GET /api/suppliers/test-webhook
 * Test integration webhook with third-party suppliers / sellers
 * VULNERABILITY: Server-Side Request Forgery (SSRF / CWE-918)
 */
router.get('/test-webhook', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ status: 'error', message: 'Missing target webhook URL parameter (?url=)' });
  }

  try {
    const client = targetUrl.startsWith('https') ? https : http;

    console.log(`[Supplier Webhook] Probing destination URL: ${targetUrl}`);

    // VULNERABLE CODE (Direct HTTP request to user-supplied endpoint without IP/domain allowlist):
    client.get(targetUrl, (upstreamRes) => {
      let data = '';
      upstreamRes.on('data', chunk => { data += chunk; });
      upstreamRes.on('end', () => {
        res.json({
          status: 'success',
          destinationUrl: targetUrl,
          statusCode: upstreamRes.statusCode,
          headers: upstreamRes.headers,
          bodyPreview: data.slice(0, 300)
        });
      });
    }).on('error', (err) => {
      res.status(502).json({
        status: 'error',
        message: 'Webhook request failed',
        error: err.message
      });
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
