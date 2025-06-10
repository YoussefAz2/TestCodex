const Orders = require('../../models/orders');

exports.create = async (req, res, next) => {
  try {
    const order = await Orders.create(req.body);
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const order = await Orders.getStatus(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};
