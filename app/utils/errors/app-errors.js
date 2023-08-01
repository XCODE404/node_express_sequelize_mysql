// Import the required modules
const { RESPONSE_STATUS_CODE, RESPONSE_MESSAGE } = require("../constants");

class AppError extends Error {
  constructor(name, statusCode, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

// 500 Internal Error
class ThrowError extends AppError {
    constructor(description = RESPONSE_MESSAGE.INTERNAL_ERROR) {
      super(
        RESPONSE_MESSAGE.INTERNAL_ERROR,
        RESPONSE_STATUS_CODE.INTERNAL_ERROR,
        description
      );
    }
  }
  
  // 400 Validation Error
  class ValidationError extends AppError {
    constructor(description = RESPONSE_MESSAGE.BAD_REQUEST) {
      super(RESPONSE_MESSAGE.BAD_REQUEST, RESPONSE_STATUS_CODE.BAD_REQUEST, description);
    }
  }
  
  // 403 Authorize error
  class AuthorizeError extends AppError {
    constructor(description = RESPONSE_MESSAGE.UN_AUTHORIZED) {
      super(RESPONSE_MESSAGE.UN_AUTHORIZED, RESPONSE_STATUS_CODE.UN_AUTHORIZED, description);
    }
  }
  
  // 404 Not Found
  class NotFoundError extends AppError {
    constructor(description = RESPONSE_MESSAGE.NOT_FOUND) {
      super(RESPONSE_MESSAGE.NOT_FOUND, RESPONSE_STATUS_CODE.NOT_FOUND, description);
    }
  }

module.exports = { AppError, ThrowError, ValidationError, AuthorizeError, NotFoundError };