// Import the required modules
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const ProductRepository = require("../repository/product-repository");
const MstRoleService = require("./mst_role-service");

// All Business logic will be here
class ProductService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist product
        const product = await ProductRepository.signIn(email);
        if (!product) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, product.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ product_id: product.product_id, role: product.mst_role.name });

        return { product: product, token: token };
    };

    static async initSignUpProduct(req) {
        // get admin role id
        const role = await MstRoleService.getMstRole("init");

        const reqProduct = {};
        reqProduct.role_id = role[0].role_id;
        reqProduct.name = CapitalizeFirstLetter("developer 1");
        reqProduct.email = "developer1@gmail.com"
        reqProduct.password = await EncodePassword("12345678");
        reqProduct.date_of_joining = await TodayDate();
        reqProduct.created_agent = await UserAgent(req.useragent);
        reqProduct.updated_agent = await UserAgent(req.useragent);

        // check exist product
        const isExistProduct = await ProductRepository.isExistProduct(reqProduct.email);
        await DuplicateData(isExistProduct);

        return await ProductRepository.createProduct(reqProduct);
    }

    static async createProduct(req) {
        const reqProduct = req.body.data; //JSON.parse(atob(req.body.data));

        reqProduct.name = CapitalizeFirstLetter(reqProduct.name);
        reqProduct.password = await EncodePassword(reqProduct.password);
        reqProduct.date_of_joining = reqProduct.date_of_joining? reqProduct.date_of_joining : await TodayDate();
        reqProduct.created_agent = await UserAgent(req.useragent);
        reqProduct.updated_agent = await UserAgent(req.useragent);

        // check exist product
        const isExistProduct = await ProductRepository.isExistProduct(reqProduct.email);
        await DuplicateData(isExistProduct);

        return await ProductRepository.createProduct(reqProduct);
    }

    static async getProduct(req) {
        return await ProductRepository.getProduct(req);
    }

    static async selectedProduct(req) {
        const { product_id } = req.params;

        return await ProductRepository.selectedProduct(product_id);
    }

    static async updateProduct(req) {
        const { product_id } = req.params;
        const reqProduct = req.body.data; //JSON.parse(atob(req.body.data));
        
        const product = await ProductRepository.selectedProduct(product_id);
        if (product.results === null) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        return await ProductRepository.updateProduct(product_id, reqProduct);
    }

    static async deleteProduct(req) {
        const { product_id } = req.params;

        const product = await ProductRepository.selectedProduct(product_id);
        if (product.results === null) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        return await ProductRepository.deleteProduct(product_id);
    }
}

module.exports = ProductService;