import express from "express";
import {
  signup,
  signin,
  logout,
  getProfile,
  checkAdmin,
} from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

// Protected routes (Requires 'protect' middleware)
router.get("/profile", protect, getProfile);

// Admin-only protected routes (Requires BOTH middlewares)
router.get("/check-admin", protect, isAdmin, checkAdmin);

export default router;
