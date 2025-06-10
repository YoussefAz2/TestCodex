const express = require('express');
const router = express.Router();
const { list, update } = require('../../controllers/admin/ordersController');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', isAdmin, list);
router.patch('/:id', isAdmin, update);

module.exports = router;
