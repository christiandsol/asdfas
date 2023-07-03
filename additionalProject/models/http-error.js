class HttpError extends Error {
  constructor(message, errorCode) {
    //add message property
    super(message);
    this.code = errorCode;
  }
}
module.exports = HttpError;
