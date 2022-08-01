import db from '../../utils/database.js';

export const getUsers = async () => {
  const users = await db.query('SELECT * FROM users');
  return users.rows;
};

export const getUser = async (email) => {
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return user.rows[0];
};

export const createUser = async ({ username, email, password, verifyCode }) => {
  const user = await db.query('INSERT INTO users (username, email, password, verifyCode, verified) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, password, verifyCode, false]);
  return user.rows[0];
};

export const verifyUser = async (id) => {
  await db.query('UPDATE users SET verified = true, verifycode = null WHERE id = $1', [id]);
};
