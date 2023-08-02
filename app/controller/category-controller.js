// Import the required modules
const CategoryService = require("../services/category-service");
const { Response } = require("../utils");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the CategoryController class
class CategoryController {
    
    static async createCategory(req, res, next) {
        try {
            const result = await CategoryService.createCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getCategory(req, res, next) {
        try {
            const result = await CategoryService.getCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedCategory(req, res, next) {
        try {
            const result = await CategoryService.selectedCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateCategory(req, res, next) {
        try {
            const result = await CategoryService.updateCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteCategory(req, res, next) {
        try {
            const result = await CategoryService.deleteCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CategoryController;