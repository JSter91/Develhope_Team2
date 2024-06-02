import { addUser, updateUserToken, getUserByEmail, getUser as _getUser, deleteUserToken, deleteAllUsers as _deleteAllUsers, getAllUsers as _getAllUsers } from '../models/userModel.mjs';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
const secretKey = 'your_secret_key';

export async function registerUser(req, res) {
  const { full_name, email, password } = req.body;

  try {
    await addUser({ full_name, email, password });
    const token = sign({}, secretKey, { expiresIn: '1h' });
    await updateUserToken(token, email);

    res.json({ success: true, message: "Utente registrato con successo", token, user: { full_name, email } });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).json({ success: false, message: "Errore durante la registrazione" });
  }
}
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user && user.password === password) {
      const token = sign({}, secretKey, { expiresIn: '1h' });
      await updateUserToken(token, email);
      res.json({ success: true, message: "Login successful", token, user: { email, full_name: user.full_name } });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}
export async function getUser(req, res) {
  const { email } = req.query;

  try {
    const user = await _getUser(email);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}
export async function logoutUser(req, res) {
  const { token } = req.body;

  try {
    await deleteUserToken(token);
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
}
export async function deleteAllUsers(req, res) {
  try {
    await _deleteAllUsers();
    res.json({ success: true, message: "Tutti gli utenti sono stati eliminati" });
  } catch (error) {
    console.error("Errore durante l'eliminazione degli utenti:", error);
    res.status(500).json({ success: false, message: "Errore durante l'eliminazione degli utenti" });
  }
}
export async function getAllUsers(req, res) {
  try {
    const users = await _getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Errore durante il recupero degli utenti:", error);
    res.status(500).json({ success: false, message: "Errore durante il recupero degli utenti" });
  }
}
