// Import the required modules
const EmployeeService = require("../services/employee-service");
const { Response } = require("../utils");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the EmployeeController class
class EmployeeController {
    static async createEmployee(req, res, next) {
        try {
            const result = await EmployeeService.createEmployee(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async getEmployee(req, res, next) {
        try {
            const result = await EmployeeService.getEmployee(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async selectedEmployee(req, res, next) {
        try {
            const result = await EmployeeService.selectedEmployee(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async updateEmployee(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async deleteEmployee(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EmployeeController;