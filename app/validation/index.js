// Import the required modules
const { STATUS_CODES } = require("../utils/constants");
const { APIError } = require("../utils/error-handler")

// Validate with req data
exports.validateBody = (schema) => {
    try {
        return (req, res, next) => {
            let result = schema.validate(req.body.data); //JSON.parse(atob(req.body.data));

            if (result.error) {
                const error_message = result.error.details[0].message.split('"').join("");
                const error = new Error(error_message);
                next(error.status = STATUS_CODES.VALIDATE_ERROR);
            } else {
                next();
            }
        }
    } catch (error) {
        APIError(error);
    }
}