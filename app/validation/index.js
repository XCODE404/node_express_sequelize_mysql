// Import the required modules
const { ValidationError } = require("../utils/errors/app-errors");

// Validate with req data
exports.ValidateInput = (schema) => {
    try {
        return (req, res, next) => {
            let result = schema.validate(req.body.data); //JSON.parse(atob(req.body.data));

            if (result.error) {
                const error_message = result.error.details[0].message.split('"').join("");
                throw new ValidationError(error_message);
            } else {
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}