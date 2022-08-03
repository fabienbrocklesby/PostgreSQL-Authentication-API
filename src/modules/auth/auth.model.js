import db from '../../utils/database.js';

export const findByEmail = async (email) => (
  await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];
