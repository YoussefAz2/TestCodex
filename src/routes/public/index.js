const express = require('express');
const router = express.Router();

const restaurantsRoute = require('./restaurants');
const ordersRoute = require('./orders');

router.use('/restaurants', restaurantsRoute);
router.use('/orders', ordersRoute);

module.exports = router;
