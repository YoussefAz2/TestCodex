const db = require('../config/database');

module.exports = {
  query: (text, params) => db.query(text, params)
};
