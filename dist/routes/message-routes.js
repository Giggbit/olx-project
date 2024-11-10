import { Router } from "express";
import { MessageController } from "../controllers/message-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";
export const messageRoutes = Router();
messageRoutes.post("/send", authenticateToken, MessageController.sendMessage);
messageRoutes.get("/", authenticateToken, MessageController.getMessages);
messageRoutes.delete("/:messageId", authenticateToken, MessageController.deleteMessage);
