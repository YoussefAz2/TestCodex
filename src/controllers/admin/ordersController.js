const Orders = require('../../models/orders');
const { broadcast } = require('../../websocket');

exports.list = async (req, res, next) => {
  try {
    const { restaurant_id } = req.query;
    const orders = await Orders.listByRestaurant(restaurant_id);
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const order = await Orders.updateStatus(req.params.id, req.body.order_status);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    broadcast({ type: 'order_updated', order });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};
