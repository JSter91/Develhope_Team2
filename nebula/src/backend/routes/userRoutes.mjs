import express from "express";
const router = express.Router();
import { registerUser, loginUser, getUser, logoutUser, deleteAllUsers, getAllUsers } from '../controllers/userController.mjs';

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUser);
router.post("/logout", logoutUser);
router.post("/deleteAllUsers", deleteAllUsers);
router.get("/getAllUsers", getAllUsers);

export default router;
