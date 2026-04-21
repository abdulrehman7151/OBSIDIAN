const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const cartRoutes = require("./Routes/CartRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/obsidian";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true
    })
);
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.send("OBSIDIAN API is running...");
});

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});