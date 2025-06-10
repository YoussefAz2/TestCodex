const express = require('express');
const router = express.Router();
const { create, getStatus } = require('../../controllers/public/ordersController');

router.post('/', create);
router.get('/:id', getStatus);

module.exports = router;
