const MenuItems = require('../../models/menuItems');

exports.add = async (req, res, next) => {
  try {
    const item = await MenuItems.add(req.params.id, req.body);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await MenuItems.update(req.params.id, req.params.item_id, req.body);
    res.json({ item });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await MenuItems.remove(req.params.id, req.params.item_id);
    res.json({ item });
  } catch (err) {
    next(err);
  }
};
