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
// CORS is crucial here: it allows your Vercel frontend to talk to this Render backend
app.use(
  cors({
    origin: "*", // For security, you can later change "*" to "https://your-frontend-url.vercel.app"
    credentials: true,
  }),
);
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// --- STATIC FOLDERS ---
const __dirname = path.resolve();
// Keep this so uploaded product images still work
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- BASE API ROUTE ---
// Since the frontend is on Vercel, Render only acts as an API.
// We removed the Express 5 wildcard route entirely to prevent the PathError.
app.get("/", (req, res) => {
  res.send("Backend API is running successfully...");
});

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
