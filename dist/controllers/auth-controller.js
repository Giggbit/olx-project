import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
export const register = async (req, res) => {
    try {
        const { login, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ login, email, password: hashedPassword });
        return res.status(201).json({ message: `User registered successfully! Password: ${password}` });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Error registering user", error });
    }
};
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        res.json({ message: `Password: ${password}  user.password: ${user?.password}  user: ${user}` });
        if (!user) {
            return res.status(401).json({ message: "Invalid login" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({
            id: user.id,
            login: user.login,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ message: "Logged in successfully", token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};
