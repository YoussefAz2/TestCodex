const express = require('express');
const router = express.Router();
const { getMenu } = require('../../controllers/public/restaurantsController');

router.get('/:id/menu', getMenu);

module.exports = router;
