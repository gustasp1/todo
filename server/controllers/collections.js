const connection = require("../config/db");
const CustomError = require("../error/CustomError");

const User = connection.models.User;
const Collection = connection.models.Collection;

const getCollections = async (req, res, next) => {
  console.log("hahha");
  try {
    const response = await User.findOne({ _id: req.user._id }).populate(
      "collections"
    );
    const collections = response.collections;
    res.status(200).json({ success: true, collections });
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const addCollection = async (req, res, next) => {
  try {
    const name = req.body.name;
    const newCollection = new Collection({
      name,
      tasks: [],
    });
    const savedCollection = await newCollection.save();
    const savedCollectionId = savedCollection._id;

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          collections: savedCollectionId,
        },
      },
      {
        new: true,
      }
    );
    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    const collectionId = req.body.collectionId;

    await Collection.findOneAndDelete(
      { _id: collectionId },
      {
        new: true,
      }
    );

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: {
          collections: collectionId,
        },
      },
      {
        new: true,
      }
    );

    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const updateCollectionName = async (req, res) => {
  try {
    const { collectionId, newName } = req.body;

    await Collection.findOneAndUpdate(
      { _id: collectionId },
      { name: newName },
      { new: true }
    );

    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

module.exports = {
  getCollections,
  addCollection,
  updateCollectionName,
  deleteCollection,
};
