const express = require("express");

const router = express.Router();
const {
  findAllGames,
  findOnegameById,
  deleteGames,
  createGames,
  editGame,
  findClearanceGames,
  // ratingGame,
} = require("../../controllers/api/Games");

router.get("/clearance", findClearanceGames);

router.get("/", findAllGames);

router.post("/", createGames);
//Update route
router.put("/:id", editGame);
//delete
router.delete("/:id", deleteGames);
//put ratings
// router.ratingGame("/:id", ratingGame);
// this gets a game only
router.get("/home/:id", findOnegameById);

module.exports = router;
