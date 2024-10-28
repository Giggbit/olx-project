import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, password: hashedPassword });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    static async getUser(req: Request, res: Response):Promise<any> {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json({message: `User ${user.login}`, data: user});
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user", error });
        }
    }

    static async updateUser(req: Request, res: Response):Promise<any> {
        try {
            const { id } = req.params;
            const { login, email } = req.body;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            await user.update({ login, email });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }

    static async deleteUser(req: Request, res: Response):Promise<any> {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            await user.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}