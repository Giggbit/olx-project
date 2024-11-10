import { Category } from "../models/category-models.js";
export class CategoryController {
    static async createCategory(req, res) {
        try {
            const { name, parentId } = req.body;
            const category = await Category.create({ name, parentId });
            res.status(201).json({ message: "Category created successfully", category });
        }
        catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Error creating category", error });
        }
    }
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Error fetching categories", error });
        }
    }
    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        }
        catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({ message: "Error fetching category", error });
        }
    }
    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name, parentId } = req.body;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.update({ name, parentId });
            res.status(200).json({ message: "Category updated successfully", category });
        }
        catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ message: "Error updating category", error });
        }
    }
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.destroy();
            res.status(200).json({ message: "Category deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Error deleting category", error });
        }
    }
}
