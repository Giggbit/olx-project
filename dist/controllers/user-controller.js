import "dotenv/config";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import { User } from "../models/user-model.js";
export class UserController {
    static async register(req, res) {
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
    static async login(req, res) {
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
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "Logged in successfully", token });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Error logging in", error });
        }
    }
    static async updateUser(req, res) {
        try {
            const userId = req.user.userId;
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
    static async deleteUser(req, res) {
        try {
            const userId = req.user.userId; // Уточняем тип
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
    static async requestPasswordReset(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiry = new Date(Date.now() + 3600000);
            await user.update({
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            });
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const resetLink = `https://127.0.0.1/users/reset-password?token=${resetToken}&id=${user.id}`;
            const mailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER,
                subject: "Password Reset Request",
                text: `To reset your password, please click the following link: ${resetLink}`,
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Password reset link sent to email." });
        }
        catch (error) {
            console.error("Error in password reset request:", error);
            res.status(500).json({ message: "Error in password reset request.", error });
        }
    }
    static async resetPassword(req, res) {
        const { token, id } = req.query;
        const { newPassword } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    id,
                    resetPasswordToken: token,
                    resetPasswordExpires: { [Op.gt]: new Date() },
                },
            });
            if (!user) {
                return res.status(400).json({ message: "Invalid or expired password reset token" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            });
            res.status(200).json({ message: "Password reset successfully" });
        }
        catch (error) {
            console.error("Error in password reset:", error);
            res.status(500).json({ message: "Error resetting password.", error });
        }
    }
}
