// Import the required modules
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const SubCategoryRepository = require("../repository/sub_category-repository");
const MstRoleService = require("./mst_role-service");

// All Business logic will be here
class SubCategoryService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist sub_category
        const sub_category = await SubCategoryRepository.signIn(email);
        if (!sub_category) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, sub_category.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ sub_category_id: sub_category.sub_category_id, role: sub_category.mst_role.name });

        return { sub_category: sub_category, token: token };
    };

    static async initSignUpSubCategory(req) {
        // get admin role id
        const role = await MstRoleService.getMstRole("init");

        const reqSubCategory = {};
        reqSubCategory.role_id = role[0].role_id;
        reqSubCategory.name = CapitalizeFirstLetter("developer 1");
        reqSubCategory.email = "developer1@gmail.com"
        reqSubCategory.password = await EncodePassword("12345678");
        reqSubCategory.date_of_joining = await TodayDate();
        reqSubCategory.created_agent = await UserAgent(req.useragent);
        reqSubCategory.updated_agent = await UserAgent(req.useragent);

        // check exist sub_category
        const isExistSubCategory = await SubCategoryRepository.isExistSubCategory(reqSubCategory.email);
        await DuplicateData(isExistSubCategory);

        return await SubCategoryRepository.createSubCategory(reqSubCategory);
    }

    static async createSubCategory(req) {
        const reqSubCategory = req.body.data; //JSON.parse(atob(req.body.data));

        reqSubCategory.name = CapitalizeFirstLetter(reqSubCategory.name);
        reqSubCategory.password = await EncodePassword(reqSubCategory.password);
        reqSubCategory.date_of_joining = reqSubCategory.date_of_joining? reqSubCategory.date_of_joining : await TodayDate();
        reqSubCategory.created_agent = await UserAgent(req.useragent);
        reqSubCategory.updated_agent = await UserAgent(req.useragent);

        // check exist sub_category
        const isExistSubCategory = await SubCategoryRepository.isExistSubCategory(reqSubCategory.email);
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
        if (sub_category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        return await SubCategoryRepository.updateSubCategory(sub_category_id, reqSubCategory);
    }

    static async deleteSubCategory(req) {
        const { sub_category_id } = req.params;

        const sub_category = await SubCategoryRepository.selectedSubCategory(sub_category_id);
        if (sub_category.results === null) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        return await SubCategoryRepository.deleteSubCategory(sub_category_id);
    }
}

module.exports = SubCategoryService;