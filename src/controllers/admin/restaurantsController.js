const Restaurants = require('../../models/restaurants');

exports.create = async (req, res, next) => {
  try {
    const restaurant = await Restaurants.create(req.body);
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const restaurant = await Restaurants.updateSettings(req.params.id, req.body);
    res.json({ restaurant });
  } catch (err) {
    next(err);
  }
};
