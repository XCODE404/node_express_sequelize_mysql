// Import the required modules
const { Response } = require("../utils");
const SubCategoryService = require("../services/sub_category-service");
const { RESPONSE_MESSAGE, RESPONSE_STATUS_CODE } = require("../utils/constants");

// Define the SubCategoryController class
class SubCategoryController {

    static async signIn(req, res, next) {
        try {
            const result = await SubCategoryService.signIn(req);
            Response(res, { message: RESPONSE_MESSAGE.SIGN_IN, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async initSignUpSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.initSignUpSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async createSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.createSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.CREATED, status: RESPONSE_STATUS_CODE.CREATED, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async getSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.getSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async selectedSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.selectedSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async updateSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.updateSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };

    static async deleteSubCategory(req, res, next) {
        try {
            const result = await SubCategoryService.deleteSubCategory(req);
            Response(res, { message: RESPONSE_MESSAGE.RETRIVED, status: RESPONSE_STATUS_CODE.OK, data: result });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = SubCategoryController;