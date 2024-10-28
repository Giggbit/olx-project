import { Router } from "express";
import { register, login } from "../controllers/auth-controller.js";
export const authRoutes = Router();
authRoutes.post("/register", register);
authRoutes.post("/login", login);
export default authRoutes;
