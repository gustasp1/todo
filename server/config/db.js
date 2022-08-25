const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

const collectionSchema = new mongoose.Schema({
  name: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const taskSchema = new mongoose.Schema({
  name: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const User = connection.model("User", userSchema);
const Collection = connection.model("Collection", collectionSchema);
const Task = connection.model("Task", taskSchema);

module.exports = connection;
