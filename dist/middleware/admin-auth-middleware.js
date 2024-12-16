import jwt from "jsonwebtoken";
import { UserRoles } from "../models/user-model.js";
export const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token not provided or invalid" });
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "f1c8437fb56bbd8c7cd";
        const decoded = jwt.verify(token, secret);
        if (!decoded.role || decoded.role !== UserRoles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admins only" });
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token", error: error });
    }
};
