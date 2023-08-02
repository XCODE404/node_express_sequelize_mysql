// Import the required modules
const { Response } = require("../utils");
const OrderService = require("../services/order-service");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the OrderController class
class OrderController {

    static async createOrder(req, res, next) {
        try {
            const result = await OrderService.createOrder(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getOrder(req, res, next) {
        try {
            const result = await OrderService.getOrder(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedOrder(req, res, next) {
        try {
            const result = await OrderService.selectedOrder(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateOrder(req, res, next) {
        try {
            const result = await OrderService.updateOrder(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteOrder(req, res, next) {
        try {
            const result = await OrderService.deleteOrder(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = OrderController;