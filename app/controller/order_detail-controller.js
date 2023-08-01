// Import the required modules
const OrderDetailService = require("../services/order_detail-service");
const { Response } = require("../utils");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the OrderDetailController class
class OrderDetailController {

    static async signIn(req, res, next) {
        try {
            const result = await OrderDetailService.signIn(req);
            Response(res, { message: RESPONSE_MESSAGE.SIGN_IN, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async initSignUpOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.initSignUpOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async createOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.createOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.getOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.selectedOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.updateOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteOrderDetail(req, res, next) {
        try {
            const result = await OrderDetailService.deleteOrderDetail(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = OrderDetailController;