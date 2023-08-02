// Import the required modules
const { Response } = require("../utils");
const MstRoleService = require("../services/mst_role-service");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the MstRoleController class
class MstRoleController {

    static async getMstRole(req, res, next) {
        try {
            const result = await MstRoleService.getMstRole(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateMstRole(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    };

    static async deleteMstRole(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    };
}

module.exports = MstRoleController;