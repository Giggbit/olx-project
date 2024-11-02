import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

export const userRoutes = Router();

// Основные маршруты
userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);

// Защищенные маршруты
userRoutes.put("/update", authenticateToken, UserController.updateUser);
userRoutes.delete("/delete", authenticateToken, UserController.deleteUser);

// Восстановление пароля
userRoutes.post("/request-password-reset", UserController.requestPasswordReset);
userRoutes.post("/reset-password", UserController.resetPassword);

// Кэширование профиля пользователя
userRoutes.get("/profile", authenticateToken, UserController.getUserProfile);
