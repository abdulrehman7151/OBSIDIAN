const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const cartRoutes = require("./Routes/CartRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.send("OBSIDIAN API is running...");
});

// Database Connection
mongoose.connect("mongodb://localhost:27017/obsidian")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});