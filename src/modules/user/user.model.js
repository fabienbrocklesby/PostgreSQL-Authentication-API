import db from '../../utils/database.js';

export const getUsers = async () => (
  await db.query('SELECT * FROM users')).rows;

export const findByEmail = async (email) => (
  await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];

export const create = async ({ username, email, password, verifyCode }) => (
  await db.query('INSERT INTO users (username, email, password, verifycode) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, password, verifyCode])).rows[0];

export const verify = async ({ email, verifyCode }) => (
  await db.query('UPDATE users SET verified = true, verifycode = null WHERE email = $1 AND verifycode = $2 RETURNING *', [email, verifyCode])).rows[0];

export const updatePassword = async ({ email, password }) => (
  await db.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING *', [password, email])).rows[0];

export const shutdown = async ({ email }) => (
  await db.query('DELETE FROM users WHERE email = $1 RETURNING *', [email])).rows[0];
