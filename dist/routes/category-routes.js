import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
import { isAdmin } from "../middleware/admin-auth-middleware.js";
export const categoryRoutes = Router();
categoryRoutes.post("/", isAdmin, CategoryController.createCategory);
categoryRoutes.get("/", isAdmin, CategoryController.getAllCategories);
categoryRoutes.get("/:id", isAdmin, CategoryController.getCategoryById);
categoryRoutes.put("/:id", isAdmin, CategoryController.updateCategory);
categoryRoutes.delete("/:id", isAdmin, CategoryController.deleteCategory);
