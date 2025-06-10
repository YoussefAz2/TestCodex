const db = require('./index');

exports.create = async ({ restaurant_id, table_number, total_amount, tip_amount, order_status }) => {
  const { rows } = await db.query(
    `INSERT INTO orders (restaurant_id, table_number, total_amount, tip_amount, order_status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [restaurant_id, table_number, total_amount, tip_amount, order_status]
  );
  return rows[0];
};

exports.getStatus = async (id) => {
  const { rows } = await db.query(
    'SELECT id, order_status FROM orders WHERE id = $1',
    [id]
  );
  return rows[0];
};

exports.listByRestaurant = async (restaurantId) => {
  const { rows } = await db.query(
    'SELECT * FROM orders WHERE restaurant_id = $1 ORDER BY created_at DESC',
    [restaurantId]
  );
  return rows;
};

exports.updateStatus = async (id, status) => {
  const { rows } = await db.query(
    'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0];
};
