const Games = require("../../models/Games");

const createGames = async (req, res) => {
  try {
    const { body } = req;
    const createdGames = await Games.create(body);
    res.status(200).json({ message: "Created Game", createdGames });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const findAllGames = async (req, res) => {
  try {
    const foundGames = await Games.find({});
    res.status(200).json(foundGames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findClearanceGames = async (req, res) => {
  try {
    const foundGames = await Games.find({ clearance: true });
    res.status(200).json(foundGames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGames = async (req, res) => {
  try {
    const deletedGame = await Games.findByIdAndDelete(req.params.id);
    if (deletedGame) {
      res.status(200).json({ message: "Deleted Game" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
const editGame = async (req, res) => {
  try {
    const gameEdited = await Games.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (gameEdited) {
      res.status(200).json({ message: "Game Edited", editedGame: gameEdited });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const findOnegameById = async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const ratingGame =async (req, res) => {
//   const {_id} = req.user;
//   const{star,gamesId}=req.body;
//   const game = await Games.findById(gamesId)
//   let alreadyRated =
// };
module.exports = {
  findAllGames,
  findClearanceGames,
  deleteGames,
  findOnegameById,
  editGame,
  createGames,
  // ratingGame,
};
