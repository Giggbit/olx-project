import { Router } from "express";
import { AdvertController } from "../controllers/advert-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

export const advertRoutes = Router();

advertRoutes.post("/", authenticateToken, AdvertController.createAdvert);
advertRoutes.get("/:id", AdvertController.getAdvertById);
advertRoutes.get("/", AdvertController.getAllAdverts);
advertRoutes.put("/:id", authenticateToken, AdvertController.updateAdvert);
advertRoutes.delete("/:id", authenticateToken, AdvertController.deleteAdvert);
advertRoutes.get("/search", AdvertController.searchAdverts);
