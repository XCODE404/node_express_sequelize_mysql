// Import the required modules
const EmployeeService = require("../services/employee-service");
const { Response } = require("../utils");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");
const { ResponseError } = require("../utils/error-handler");

// Define the EmployeeController class
class EmployeeController {
    static async createEmployee(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

    static async getEmployee(req, res, next) {
        try {
            const result = await EmployeeService.getEmployee(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            throw ResponseError(error);
        }
    }

    static async selectedEmployee(req, res, next) {
        try {
            
        } catch (error) {
            throw new ResponseError(error);
        }
    }

    static async updateEmployee(req, res, next) {
        try {
            
        } catch (error) {
            throw new ResponseError(error);
        }
    }

    static async deleteEmployee(req, res, next) {
        try {
            
        } catch (error) {
            throw new ResponseError(error);
        }
    }
}

module.exports = EmployeeController;