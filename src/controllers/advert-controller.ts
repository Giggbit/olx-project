import { Request, Response } from "express";
import { Advert } from "../models/advert-model.js";
import { Category } from "../models/category-models.js";

export class AdvertController {
    static async createAdvert(req: Request, res: Response):Promise<any> {
        try {
            const userId = (req.user as { userId: string }).userId;
            const { title, description, categoryId, price, location } = req.body;

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            const advert = await Advert.create({
                userId,
                title,
                description,
                categoryId,
                price,
                location,
            });
            res.status(201).json({ message: "Advert created successfully", advert });
        } 
        catch (error) {
            console.error("Error creating advert:", error);
            res.status(500).json({ message: "Error creating advert", error });
        }
    }

    static async getAdvertById(req: Request, res: Response):Promise<any> {
        try {
            const { id } = req.params;
            const advert = await Advert.findByPk(id);

            if (!advert) {
                return res.status(404).json({ message: "Advert not found" });
            }
            res.status(200).json(advert);
        } 
        catch (error) {
            console.error("Error fetching advert:", error);
            res.status(500).json({ message: "Error fetching advert", error });
        }
    }

    static async getAllAdverts(req: Request, res: Response) {
        try {
            const adverts = await Advert.findAll();
            res.status(200).json(adverts);
        } 
        catch (error) {
            console.error("Error fetching adverts:", error);
            res.status(500).json({ message: "Error fetching adverts", error });
        }
    }

    static async updateAdvert(req: Request, res: Response):Promise<any> {
        try {
            const userId = (req.user as { userId: string }).userId;
            const { id } = req.params;
            const { title, description, category, price, location } = req.body;

            const advert = await Advert.findByPk(id);
            if (!advert) {
                return res.status(404).json({ message: "Advert not found" });
            }

            if (advert.userId !== userId) {
                return res.status(403).json({ message: "You are not authorized to update this advert" });
            }
            await advert.update({ title, description, category, price, location });
            res.status(200).json({ message: "Advert updated successfully", advert });
        } 
        catch (error) {
            console.error("Error updating advert:", error);
            res.status(500).json({ message: "Error updating advert", error });
        }
    }

    static async deleteAdvert(req: Request, res: Response):Promise<any> {
        try {
            const userId = (req.user as { userId: string }).userId;
            const { id } = req.params;

            const advert = await Advert.findByPk(id);
            if (!advert) {
                return res.status(404).json({ message: "Advert not found" });
            }

            if (advert.userId !== userId) {
                return res.status(403).json({ message: "You are not authorized to delete this advert" });
            }
            await advert.destroy();
            res.status(200).json({ message: "Advert deleted successfully" });
        } 
        catch (error) {
            console.error("Error deleting advert:", error);
            res.status(500).json({ message: "Error deleting advert", error });
        }
    }
}
