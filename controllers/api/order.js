const Order = require("../../models/Order");
module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    const { id } = req.params;
    await cart.addItemToCart(id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    const { itemId, newQty } = req.body;

    if (typeof newQty !== "number" || newQty <= 0) {
      return res.status(400).json({ msg: "Invalid quantity value." });
    }

    const lineItem = cart.lineItems.find(
      (item) => item.item.toString() === itemId
    );
    if (!lineItem) {
      return res.status(400).json({ msg: "Item not found in the cart." });
    }

    await cart.setItemQty(itemId, newQty); // Using the newQty
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function setItemQtyInCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    const { itemId, newQty } = req.body;
    await cart.setItemQty(itemId, newQty); // Using the newQty
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

// Return the logged in user's paid order history
async function history(req, res) {
  // Sort most recent orders first
  try {
    const orders = await Order.find({ user: req.user._id, isPaid: true })
      .sort("-updatedAt")
      .exec();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
