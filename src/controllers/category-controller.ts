import { Request, Response } from "express";
import { Category } from "../models/category-models.js";

export class CategoryController {
    static async createCategory(req: Request, res: Response) {
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error creating category", error });
        }
    }

    static async getCategory(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving category", error });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });
            await category.update(req.body);
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error updating category", error });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });
            await category.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: "Error deleting category", error });
        }
    }
}
