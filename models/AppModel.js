
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 30036,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL pool connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL pool connection failed:', err.message);
  }
})();

class AppModel {
  static async insert(table, data) {
    const keys = Object.keys(data).map(k => `\`${k}\``).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO \`${table}\` (${keys}) VALUES (${placeholders})`;
    const [results] = await pool.query(query, values);
    return results;
  }
}

module.exports = AppModel;
