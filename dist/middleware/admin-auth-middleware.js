import { User } from "../models/user-model.js";
import { UserRoles } from "../models/user-model.js";
export const isAdmin = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID provided" });
        }
        const user = await User.findByPk(userId);
        if (!user || user.role !== UserRoles.ADMIN) {
            return res.status(403).json({ message: "Forbidden: Admin access only" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during admin check" });
    }
};
