const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
