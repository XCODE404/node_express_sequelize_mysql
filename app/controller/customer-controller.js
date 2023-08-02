// Import the required modules
const CustomerService = require("../services/customer-service");
const { Response } = require("../utils");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the CustomerController class
class CustomerController {
    
    static async initSignUpCustomer(req, res, next) {
        try {
            const result = await CustomerService.initSignUpCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async createCustomer(req, res, next) {
        try {
            const result = await CustomerService.createCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getCustomer(req, res, next) {
        try {
            const result = await CustomerService.getCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedCustomer(req, res, next) {
        try {
            const result = await CustomerService.selectedCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateCustomer(req, res, next) {
        try {
            const result = await CustomerService.updateCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteCustomer(req, res, next) {
        try {
            const result = await CustomerService.deleteCustomer(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CustomerController;