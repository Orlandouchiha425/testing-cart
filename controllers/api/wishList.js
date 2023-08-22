const Wishlist = require("../../models/WishList");
const User = require("../../models/user");

// Add a game to the wishlist
const addGameToWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    // Find the user by ID to check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, games: [] });
    }

    // Add the game to the wishlist if it's not already there
    if (!wishlist.games.includes(gameId)) {
      wishlist.games.push(gameId);
      await wishlist.save();
      res.status(200).json({ message: "Game added to wishlist successfully" });
    } else {
      res.status(400).json({ error: "Game is already in the wishlist" });
    }
  } catch (error) {
    console.error("Error adding game to wishlist:", error);
    res.status(500).json({ error: "Unable to add game to wishlist" });
  }
};

// Remove a game from the wishlist
const deleteGameFromWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    // Find the user by ID to check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Remove the game from the wishlist if it's there
    if (wishlist.games.includes(gameId)) {
      wishlist.games = wishlist.games.filter(
        (game) => game.toString() !== gameId
      );
      await wishlist.save();
      res
        .status(200)
        .json({ message: "Game removed from wishlist successfully" });
    } else {
      res.status(400).json({ error: "Game is not in the wishlist" });
    }
  } catch (error) {
    console.error("Error removing game from wishlist:", error);
    res.status(500).json({ error: "Unable to remove game from wishlist" });
  }
};

// Get wishlist for a specific user
const getWishListForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID to check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Wish List not found" });
    }

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId }).populate("games");
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Unable to fetch wishlist" });
  }
};

module.exports = {
  addGameToWishList,
  getWishListForUser,
  deleteGameFromWishList,
};
