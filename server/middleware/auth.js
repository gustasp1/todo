const passport = require("passport");
const CustomError = require("../error/CustomError");

module.exports.isAuth = (req, res, next) => {
  console.log("ath");
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new CustomError.unauthorized("unauthorized"));
  }
};

module.exports.authenticate = passport.authenticate("local");
