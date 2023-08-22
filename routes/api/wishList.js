const express = require("express");

const router = express.Router();
const {
  addGameToWishList,
  getWishListForUser,
  deleteGameFromWishList,
} = require("../../controllers/api/wishList");

router.post('/',addGameToWishList);
router.get('/',getWishListForUser);
router.delete('/:id',deleteGameFromWishList)

module.exports = router;
