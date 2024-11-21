import express from "express";
import { isAdmin } from "../middleware/admin-auth-middleware.js";
import { AdvertController } from "../controllers/advert-controller.js";
import { UserController } from "../controllers/user-controller.js";

export const adminRoutes = express.Router();

adminRoutes.patch("/adverts/status", isAdmin, AdvertController.changeAdverStatus);
adminRoutes.post("/users/create", isAdmin, UserController.register);
adminRoutes.patch("/users/update", isAdmin, UserController.updateUser);
