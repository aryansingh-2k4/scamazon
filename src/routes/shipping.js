const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

/**
 * POST /api/shipping/ping-hub
 * Network diagnostics tool for Scamazon Fulfillment Centers
 * VULNERABILITY: OS Command Injection via child_process.exec (CWE-78)
 */
router.post('/ping-hub', (req, res) => {
  const host = req.body.host || req.query.host || '127.0.0.1';

  // VULNERABLE CODE (Direct string concatenation into shell process):
  const command = "ping -n 1 " + host;

  console.log(`[Shipping Diagnostics] Executing command: ${command}`);

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to contact fulfillment hub',
        error: error.message,
        commandExecuted: command
      });
    }

    res.json({
      status: 'success',
      host,
      commandExecuted: command,
      output: stdout
    });
  });
});

module.exports = router;
