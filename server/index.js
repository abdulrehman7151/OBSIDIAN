const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const cartRoutes = require("./Routes/CartRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/obsidian";
const NODE_ENV = process.env.NODE_ENV || "development";

// Parse CLIENT_URL with fallback for production
const CLIENT_URL = process.env.CLIENT_URL || 
    (NODE_ENV === "production" ? "*" : "http://localhost:5173");

console.log(`Environment: ${NODE_ENV}`);
console.log(`Server running on PORT: ${PORT}`);
console.log(`MongoDB URI: ${MONGODB_URI}`);
console.log(`CORS Origin: ${CLIENT_URL}`);

// Middleware
app.use(
    cors({
        origin: CLIENT_URL === "*" ? true : CLIENT_URL,
        credentials: true
    })
);
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.json({ 
        message: "OBSIDIAN API is running...",
        environment: NODE_ENV,
        version: "1.0.0"
    });
});

// 404 Handler for undefined API routes
app.use("/api", (req, res) => {
    res.status(404).json({ 
        error: "Route not found",
        path: req.path,
        method: req.method,
        availableRoutes: ["/api/auth/login", "/api/auth/register", "/api/cart"]
    });
});

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("✅ Database connected successfully");
    })
    .catch((error) => {
        console.error("❌ Database connection error:", error.message);
        process.exit(1);
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({ 
        error: err.message || "Internal server error",
        ...(NODE_ENV === "development" && { stack: err.stack })
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📍 Frontend should use API_URL: ${process.env.API_PUBLIC_URL || `http://localhost:${PORT}`}`);
});