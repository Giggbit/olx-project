import "dotenv/config";
import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return; // Завершаем выполнение, чтобы явно вернуть void
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid or expired token" });
            return; // Завершаем выполнение, чтобы явно вернуть void
        }
        req.user = decoded; // Присваиваем тип userId
        next();
    });
};
