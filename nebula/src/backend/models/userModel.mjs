import database from '../config/database.mjs';
const { db } = database
export function getUserByEmail(email) { return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]); }
export function addUser(user) {
  return db.none(
    "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)",
    [user.full_name, user.email, user.password]
  );
}
export function updateUserToken(token, email) { return db.none("UPDATE users SET token = $1 WHERE email = $2", [token, email]); }
export function deleteUserToken(token) { return db.none("UPDATE users SET token = NULL WHERE token = $1", [token]); }
export function deleteAllUsers() { return db.none("DELETE FROM users"); }
export function getAllUsers() { return db.any("SELECT * FROM users"); }
export function getUser(email) { return db.oneOrNone("SELECT full_name, email FROM users WHERE email = $1", [email]); }
