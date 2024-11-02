import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { v4 as uuidv4 } from "uuid";

export class UserController {
    static async register(req: Request, res: Response):Promise<any> {
        try {
            const { login, email, password, role } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: "User with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                id: uuidv4(),
                login,
                email,
                password: hashedPassword,
                role: role || "guest"
            });
            res.status(201).json({ message: "User registered successfully", user });
        } 
        catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ message: "Error registering user", error });
        }
    }

    static async login(req: Request, res: Response):Promise<any> {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ where: { login } });
            if (!user) {
                return res.status(401).json({ message: "Invalid login or password" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid login or password" });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );
            res.status(200).json({ message: "Logged in successfully", token });
        } 
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Error logging in", error });
        }
    }

    static async updateUser(req: Request, res: Response):Promise<any> {
        try {
            const userId = (req.user as JwtPayload & { userId: string }).userId;
            const { login, email, role } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await user.update({ login, email, role });
            res.status(200).json({ message: "User updated successfully", user });
        } 
        catch (error) {
            console.error("Update error:", error);
            res.status(500).json({ message: "Error updating user", error });
        }
    }

    static async deleteUser(req: Request, res: Response):Promise<any> {
        try {
            const userId = (req.user as JwtPayload & { userId: string }).userId; // Уточняем тип
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await user.destroy();
            res.status(200).json({ message: "User deleted successfully" });
        } 
        catch (error) {
            console.error("Delete error:", error);
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}
