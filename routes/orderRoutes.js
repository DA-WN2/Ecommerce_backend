import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Update root route to allow admins to GET all orders
router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/mine").get(protect, getMyOrders);

// Specific order ID routes
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
