import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// --- STATIC FOLDERS ---
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- PRODUCTION SETUP ---
if (process.env.NODE_ENV === "production") {
  // Set the static folder for the React build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // THE FIX: Adding ':path' names the parameter to satisfy Express 5's strict routing
  // The '*' after 'path' allows it to catch all sub-directories (like /cart or /profile)
  app.get("/:path*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// --- ERROR HANDLING MIDDLEWARE ---
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `====> Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT} <====`,
  );
  console.log("----> HELLO ADIL! THE BACKEND IS OFFICIALLY READY! <----");
});
