import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("====> PRODUCT ROUTES ARE SUCCESSFULLY CONNECTED! <====");

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
// router.route('/:id').get(getProductById);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
