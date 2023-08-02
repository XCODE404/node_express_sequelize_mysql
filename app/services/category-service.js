// Import the required modules
const { DuplicateData, UserAgent, } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const CategoryRepository = require("../repository/category-repository");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");

// All Business logic will be here
class CategoryService {

    static async createCategory(req) {
        const reqCategory = req.body.data; //JSON.parse(atob(req.body.data));

        reqCategory.created_employee = req.employee.employee_id;
        reqCategory.updated_employee = req.employee.employee_id;
        reqCategory.created_agent = await UserAgent(req.useragent);
        reqCategory.updated_agent = await UserAgent(req.useragent);

        // check exist category
        const isExistCategory = await CategoryRepository.isExistCategory(reqCategory.name);
        await DuplicateData(isExistCategory);

        return await CategoryRepository.createCategory(reqCategory);
    }

    static async getCategory(req) {
        return await CategoryRepository.getCategory(req);
    }

    static async selectedCategory(req) {
        const { category_id } = req.params;

        return await CategoryRepository.selectedCategory(category_id);
    }

    static async updateCategory(req) {
        const { category_id } = req.params;
        const reqCategory = req.body.data; //JSON.parse(atob(req.body.data));
        
        const category = await CategoryRepository.selectedCategory(category_id);
        if (category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await CategoryRepository.updateCategory(category_id, reqCategory);
    }

    static async deleteCategory(req) {
        const { category_id } = req.params;

        const category = await CategoryRepository.selectedCategory(category_id);
        if (category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await CategoryRepository.deleteCategory(category_id);
    }
}

module.exports = CategoryService;