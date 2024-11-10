import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
export const categoryRoutes = Router();
categoryRoutes.post("/", CategoryController.createCategory);
categoryRoutes.get("/", CategoryController.getAllCategories);
categoryRoutes.get("/:id", CategoryController.getCategoryById);
categoryRoutes.put("/:id", CategoryController.updateCategory);
categoryRoutes.delete("/:id", CategoryController.deleteCategory);
