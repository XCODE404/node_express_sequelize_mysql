// Import the required modules
const { RESPONSE_STATUS_CODE } = require("../utils/constants");
const { ResponseError } = require("../utils/error-handler")

// Validate with req data
exports.validateBody = (schema) => {
    try {
        return (req, res, next) => {
            let result = schema.validate(req.body.data); //JSON.parse(atob(req.body.data));

            if (result.error) {
                const error_message = result.error.details[0].message.split('"').join("");
                const error = new Error(error_message);
                next(error.status = RESPONSE_STATUS_CODE.VALIDATE_ERROR);
            } else {
                next();
            }
        }
    } catch (error) {
        throw new ResponseError(error);
    }
}