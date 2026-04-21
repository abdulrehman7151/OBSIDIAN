const Cart = require("../Models/CartModels");

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        
        if (!cart) {
            // Create empty cart if it doesn't exist
            cart = new Cart({ userId: req.user.id, items: [] });
            await cart.save();
        }
        
        res.status(200).json(cart.items);
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// Sync cart (overwrites with current state)
exports.syncCart = async (req, res) => {
    try {
        const { items } = req.body;
        
        let cart = await Cart.findOne({ userId: req.user.id });
        
        if (cart) {
            cart.items = items;
            await cart.save();
        } else {
            cart = new Cart({ userId: req.user.id, items });
            await cart.save();
        }
        
        res.status(200).json({ message: "Cart synced successfully", items: cart.items });
    } catch (error) {
        console.error("Sync Cart Error:", error);
        res.status(500).json({ message: "Error syncing cart", error });
    }
};
