const Restaurants = require('../../models/restaurants');

exports.getMenu = async (req, res, next) => {
  try {
    const menu = await Restaurants.getMenu(req.params.id);
    res.json({ menu });
  } catch (err) {
    next(err);
  }
};
