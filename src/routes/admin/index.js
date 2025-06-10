const express = require('express');
const router = express.Router();

const restaurantsRoute = require('./restaurants');

router.use('/', restaurantsRoute);

module.exports = router;
