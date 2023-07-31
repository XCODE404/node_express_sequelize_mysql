// Import the required modules
const { RESPONSE_STATUS_CODE, RESPONSE_MESSAGE } = require("./constants");

class AppError extends Error {
    constructor(name, statusCode, description) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = true;
        
        // Error.captureStackTrace(this, this.constructor);
        res.send(statusCode).json({ message: RESPONSE_MESSAGE.UN_AUTHORIZED });
    }
}

class ResponseError extends AppError {
    constructor({name, statusCode = RESPONSE_STATUS_CODE.INTERNAL_ERROR, description = RESPONSE_MESSAGE.SERVER_ERROR, isOperational = true}){
        super(name, statusCode, description, isOperational);
    }
}

class BadRequestError extends AppError {
    constructor(description = RESPONSE_MESSAGE.BAD_REQUEST){
        super(RESPONSE_MESSAGE.NOT_FOUND, RESPONSE_STATUS_CODE.BAD_REQUEST, description, true);
    }
}

class ValidationError extends AppError {
    constructor(description = RESPONSE_MESSAGE.VALIDATION_ERROR){
        super(RESPONSE_MESSAGE.BAD_REQUEST, RESPONSE_STATUS_CODE.BAD_REQUEST, description, true);
    }
}

module.exports = { AppError, ResponseError, BadRequestError, ValidationError };