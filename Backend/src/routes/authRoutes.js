import express from "express"
import { register, login, logoutUser } from "../controllers/authController.js"
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logoutUser);

export default router;