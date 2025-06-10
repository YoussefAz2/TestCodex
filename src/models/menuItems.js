const db = require('./index');

exports.add = async (restaurantId, { menu_id, name, description, price, photo_url, available }) => {
  const { rows } = await db.query(
    `INSERT INTO menu_items (menu_id, name, description, price, photo_url, available)
     SELECT m.id, $2, $3, $4, $5, $6
       FROM menus m
      WHERE m.id = $1 AND m.restaurant_id = $7
     RETURNING *`,
    [menu_id, name, description, price, photo_url, available, restaurantId]
  );
  return rows[0];
};

exports.update = async (restaurantId, itemId, updates) => {
  const keys = Object.keys(updates);
  if (!keys.length) return null;
  const setClauses = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  const values = keys.map(k => updates[k]);
  values.push(restaurantId, itemId);
  const { rows } = await db.query(
    `UPDATE menu_items mi SET ${setClauses}
      FROM menus m
     WHERE mi.menu_id = m.id AND m.restaurant_id = $${keys.length + 1}
       AND mi.id = $${keys.length + 2}
     RETURNING mi.*`,
    values
  );
  return rows[0];
};

exports.remove = async (restaurantId, itemId) => {
  const { rows } = await db.query(
    `DELETE FROM menu_items mi
      USING menus m
     WHERE mi.menu_id = m.id AND m.restaurant_id = $1 AND mi.id = $2
     RETURNING mi.*`,
    [restaurantId, itemId]
  );
  return rows[0];
};
