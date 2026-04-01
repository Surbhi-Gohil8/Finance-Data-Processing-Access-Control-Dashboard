const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const transactionRoute = require('./transaction.routes');
const dashboardRoute = require('./dashboard.routes');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/transactions', transactionRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
