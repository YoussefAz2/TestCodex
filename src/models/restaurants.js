const db = require('./index');

exports.create = async ({ name, logo_url, address, language, tax_config, tip_config }) => {
  const { rows } = await db.query(
    `INSERT INTO restaurants (name, logo_url, address, language, tax_config, tip_config)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, logo_url, address, language, tax_config, tip_config]
  );
  return rows[0];
};

exports.updateSettings = async (id, settings) => {
  const keys = Object.keys(settings);
  if (!keys.length) return null;
  const setClauses = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  const values = keys.map(k => settings[k]);
  values.push(id);
  const { rows } = await db.query(
    `UPDATE restaurants SET ${setClauses} WHERE id = $${keys.length + 1} RETURNING *`,
    values
  );
  return rows[0];
};

exports.getMenu = async (id) => {
  const { rows } = await db.query(
    `SELECT m.id AS menu_id, m.name AS menu_name, mi.*
       FROM menus m
       JOIN menu_items mi ON mi.menu_id = m.id
      WHERE m.restaurant_id = $1 AND mi.available = true
      ORDER BY mi.id`,
    [id]
  );
  return rows;
};
