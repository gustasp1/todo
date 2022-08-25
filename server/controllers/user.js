const { genPassword, validPassword } = require("../lib/passwordUtils");
const connection = require("../config/db");
const CustomError = require("../error/CustomError");

const User = connection.models.User;

const loginUser = (req, res) => {
  res.json({ userId: req.user._id });
};
const registerUser = async (req, res, next) => {
  try {
    const { salt, hash } = genPassword(req.body.password);

    const user = await User.findOne({ username: req.body.username });

    if (!req.body.password) {
      next(CustomError.badRequest("Password cannot be empty"));
      return;
    }
    if (!req.body.username) {
      next(CustomError.badRequest("Username cannot be empty"));
      return;
    }

    if (user) {
      next(CustomError.badRequest("This username is already taken "));
      return;
    }

    const newUser = new User({
      username: req.body.username,
      hash,
      salt,
      collections: [],
    });

    await newUser.save();

    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const logoutUser = async (req, res) => {
  try {
    //TODO: find a better way to log out
    User.db.dropCollection("sessions", function (err, result) {});
    req.session.destroy((err) => {});

    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

module.exports = { loginUser, registerUser, getUserInfo, logoutUser };
