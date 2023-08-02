// Import the required modules
const { Response } = require("../utils");
const ProductService = require("../services/product-service");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the ProductController class
class ProductController {

    static async createProduct(req, res, next) {
        try {
            const result = await ProductService.createProduct(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getProduct(req, res, next) {
        try {
            const result = await ProductService.getProduct(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedProduct(req, res, next) {
        try {
            const result = await ProductService.selectedProduct(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateProduct(req, res, next) {
        try {
            const result = await ProductService.updateProduct(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteProduct(req, res, next) {
        try {
            const result = await ProductService.deleteProduct(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = ProductController;