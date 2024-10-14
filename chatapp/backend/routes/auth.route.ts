import { login, signup, logout } from "./../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
