const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");
const authMiddleware = require("../Middleware/authMiddleware");

// Protected routes
router.get("/", authMiddleware, cartController.getCart);
router.post("/sync", authMiddleware, cartController.syncCart);

module.exports = router;
