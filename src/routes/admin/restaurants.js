const express = require('express');
const router = express.Router();
const { create, updateSettings } = require('../../controllers/admin/restaurantsController');
const { add, update, remove } = require('../../controllers/admin/menuItemsController');
const isAdmin = require('../../middleware/isAdmin');

router.post('/restaurants', isAdmin, create);
router.patch('/restaurants/:id/settings', isAdmin, updateSettings);
router.post('/restaurants/:id/menu_items', isAdmin, add);
router.patch('/restaurants/:id/menu_items/:item_id', isAdmin, update);
router.delete('/restaurants/:id/menu_items/:item_id', isAdmin, remove);

module.exports = router;
