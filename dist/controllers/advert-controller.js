import { Advert } from "../models/advert-model.js";
import { Category } from "../models/category-models.js";
import { Op } from "sequelize";
import { AdvertImage } from "../models/advert-image-model.js";
export class AdvertController {
    static async createAdvert(req, res) {
        try {
            const userId = req.user.userId;
            const { title, description, categoryId, price, location } = req.body;
            const files = req.files;
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
            if (files) {
                const imagePaths = files.map((file) => ({
                    advertId: advert.id,
                    imagePath: file.path,
                }));
                await AdvertImage.bulkCreate(imagePaths);
            }
            res.status(201).json({ message: "Advert created successfully", advert });
        }
        catch (error) {
            console.error("Error creating advert:", error);
            res.status(500).json({ message: "Error creating advert", error });
        }
    }
    static async getAdvertById(req, res) {
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
    static async getAllAdverts(req, res) {
        try {
            const adverts = await Advert.findAll();
            res.status(200).json(adverts);
        }
        catch (error) {
            console.error("Error fetching adverts:", error);
            res.status(500).json({ message: "Error fetching adverts", error });
        }
    }
    static async updateAdvert(req, res) {
        try {
            const userId = req.user.userId;
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
    static async deleteAdvert(req, res) {
        try {
            const userId = req.user.userId;
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
    static async searchAdverts(req, res) {
        try {
            const { category, location, priceMin, priceMax, keyword, sortBy = "createdAt", order = "DESC", } = req.query;
            const whereConditions = {};
            if (category) {
                whereConditions.category = category;
            }
            if (location) {
                whereConditions.location = location;
            }
            if (priceMin) {
                whereConditions.price = { [Op.gte]: parseFloat(priceMin) };
            }
            if (priceMax) {
                whereConditions.price = {
                    ...whereConditions.price,
                    [Op.lte]: parseFloat(priceMax),
                };
            }
            if (keyword) {
                whereConditions[Op.or] = [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                ];
            }
            const adverts = await Advert.findAll({
                where: whereConditions,
                order: [[sortBy, order]],
            });
            res.status(200).json(adverts);
        }
        catch (error) {
            console.error("Error searching adverts:", error);
            res.status(500).json({ message: "Error searching adverts", error });
        }
    }
}
