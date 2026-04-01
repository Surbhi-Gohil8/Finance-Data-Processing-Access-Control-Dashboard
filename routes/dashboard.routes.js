const express = require('express');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();

router.use(auth); // Authentication required
router.get('/summary', authorize('viewer', 'analyst', 'admin'), dashboardController.getSummary);

module.exports = router;
