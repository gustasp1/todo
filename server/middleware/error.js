const CustomError = require("../error/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.code).json({ msg: err.msg });
  } else {
    res.status(500).json({ msg: "oops. something went wrong" });
  }
};

module.exports = errorHandler;
