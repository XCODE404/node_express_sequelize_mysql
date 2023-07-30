// Import the required modules
const { STATUS_CODES, RESPONSE_MESSAGE } = require("./constants");

class AppError extends Error {
    constructor(name, statusCode, description) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = true;
        
        Error.captureStackTrace(this);
    }
}

class APIError extends AppError {
    constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description = RESPONSE_MESSAGE.SERVER_ERROR, isOperational = true){
        super(name, statusCode, description, isOperational);
    }
}

class BadRequestError extends AppError {
    constructor(description = RESPONSE_MESSAGE.BAD_REQUEST){
        super(RESPONSE_MESSAGE.NOT_FOUND, STATUS_CODES.BAD_REQUEST, description, true);
    }
}

class ValidationError extends AppError {
    constructor(description = RESPONSE_MESSAGE.VALIDATION_ERROR){
        super(RESPONSE_MESSAGE.BAD_REQUEST, STATUS_CODES.BAD_REQUEST, description, true);
    }
}

module.exports = { AppError, APIError, BadRequestError, ValidationError };