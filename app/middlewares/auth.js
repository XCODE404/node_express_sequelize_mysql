// Import the required modules
const { ValidateSignature } = require("../utils");
const { RESPONSE_MESSAGE, ROLE } = require("../utils/constants");
const { AuthorizeError } = require("../utils/errors/app-errors");

class UserAuth {
    static async verifyToken(req, res, next) {
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

    static async isAdmin(req, res, next) {
        try {
            if (req.employee.role === ROLE.ADMIN) {
                return next();
            };
            throw new AuthorizeError(RESPONSE_MESSAGE.INVALID_ADMIN);
        } catch (error) {
            next(error);
        }
    }

    static async isSupervisor(req, res, next) {
        try {
            if (req.employee.role === ROLE.SUPERVISOR) {
                return next();
            };
            throw new AuthorizeError(RESPONSE_MESSAGE.INVALID_SUPERVISOR);
        } catch (error) {
            next(error);
        }
    }

    static async isAdminOrSupervisor(req, res, next) {
        try {
            if (req.employee.role === ROLE.ADMIN || req.employee.role === ROLE.SUPERVISOR) {
                return next();
            };
            throw new AuthorizeError(RESPONSE_MESSAGE.INVALID_ADMIN_SUPERVISOR);
        } catch (error) {
            next(error);
        }
    }

    static async isStaff(req, res, next) {
        try {
            if (req.employee.role === ROLE.STAFF) {
                return next();
            };
            throw new AuthorizeError(RESPONSE_MESSAGE.UN_AUTHORIZED);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserAuth;