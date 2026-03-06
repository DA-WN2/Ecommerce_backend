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

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 * * @route   GET /api/orders
 * @desc    Get all orders
 * @access  Private/Admin
 */
router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);

/**
 * @route   GET /api/orders/mine
 * @desc    Get logged-in user's orders
 * @access  Private
 */
router.route("/mine").get(protect, getMyOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.route("/:id").get(protect, getOrderById);

/**
 * @route   PUT /api/orders/:id/pay
 * @desc    Update order to paid
 * @access  Private
 */
router.route("/:id/pay").put(protect, updateOrderToPaid);

/**
 * @route   PUT /api/orders/:id/deliver
 * @desc    Update order to delivered
 * @access  Private/Admin
 */
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
