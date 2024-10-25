const express = require('express');
const { healthCheck } = require('../controllers/healthController');
const router = express.Router();

// Health check endpoint
router.get('/healthz', healthCheck);

module.exports = router;
