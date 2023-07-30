const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");
const { ResponseError } = require("../utils/error-handler");
const { ValidateSignature } = require("../utils")

module.exports = async (req, res, next) => {
    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }

    throw new ResponseError(RESPONSE_MESSAGE.UN_AUTHORIZED, RESPONSE_STATUS_CODE.UN_AUTHORIZED);
}