import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// This links POST /api/users to your registration function
router.route("/").post(registerUser);

export default router;
