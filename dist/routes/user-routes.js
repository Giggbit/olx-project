import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";
export const userRoutes = Router();
userRoutes.route("/")
    .post(UserController.createUser)
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);
userRoutes.get("/protected", authenticateToken, (req, res) => {
    res.send("Protected route by JWT");
});
