const { RESPONSE_MESSAGE } = require("../utils/constants");
const { ValidateSignature } = require("../utils");
const { AuthorizeError } = require("../utils/errors/app-errors");

module.exports = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req);

        if (isAuthorized) {
            return next();
        }
    
        throw new AuthorizeError(RESPONSE_MESSAGE.UN_AUTHORIZED);
    } catch (error) {
        next(error);
    }
}