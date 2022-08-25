class CustomError {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }

  static badRequest(msg) {
    return new CustomError(400, msg);
  }

  static unauthorized(msg) {
    return new CustomError(401, msg);
  }

  static internal(msg) {
    return new CustomError(500, msg);
  }
}

module.exports = CustomError;
