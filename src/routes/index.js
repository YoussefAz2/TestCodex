const express = require('express');
const router = express.Router();

const healthRoute = require('./health');
const publicRoutes = require('./public');
const adminRoutes = require('./admin');

router.use('/health', healthRoute);
router.use('/public', publicRoutes);
router.use('/', adminRoutes);

module.exports = router;
