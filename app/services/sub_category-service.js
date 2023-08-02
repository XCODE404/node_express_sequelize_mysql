// Import the required modules
const { DuplicateData, UserAgent } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError } = require("../utils/errors/app-errors");
const SubCategoryRepository = require("../repository/sub_category-repository");

// All Business logic will be here
class SubCategoryService {

    static async createSubCategory(req) {
        const reqSubCategory = req.body.data; //JSON.parse(atob(req.body.data));

        reqSubCategory.created_employee = req.employee.employee_id;
        reqSubCategory.updated_employee = req.employee.employee_id;
        reqSubCategory.created_agent = await UserAgent(req.useragent);
        reqSubCategory.updated_agent = await UserAgent(req.useragent);

        // check exist sub_category
        const isExistSubCategory = await SubCategoryRepository.isExistSubCategory(reqSubCategory.name);
        await DuplicateData(isExistSubCategory);

        return await SubCategoryRepository.createSubCategory(reqSubCategory);
    }

    static async getSubCategory(req) {
        return await SubCategoryRepository.getSubCategory(req);
    }

    static async selectedSubCategory(req) {
        const { sub_category_id } = req.params;

        return await SubCategoryRepository.selectedSubCategory(sub_category_id);
    }

    static async updateSubCategory(req) {
        const { sub_category_id } = req.params;
        const reqSubCategory = req.body.data; //JSON.parse(atob(req.body.data));
        
        const sub_category = await SubCategoryRepository.selectedSubCategory(sub_category_id);
        if (sub_category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await SubCategoryRepository.updateSubCategory(sub_category_id, reqSubCategory);
    }

    static async deleteSubCategory(req) {
        const { sub_category_id } = req.params;

        const sub_category = await SubCategoryRepository.selectedSubCategory(sub_category_id);
        if (sub_category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await SubCategoryRepository.deleteSubCategory(sub_category_id);
    }
}

module.exports = SubCategoryService;