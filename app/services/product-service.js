// Import the required modules
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const ProductRepository = require("../repository/product-repository");
const MstRoleService = require("./mst_role-service");

// All Business logic will be here
class ProductService {

    static async createProduct(req) {
        const reqProduct = req.body.data; //JSON.parse(atob(req.body.data));
        
        reqProduct.created_employee = req.employee.employee_id;
        reqProduct.updated_employee = req.employee.employee_id;
        reqProduct.created_agent = await UserAgent(req.useragent);
        reqProduct.updated_agent = await UserAgent(req.useragent);

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
        if (product.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await ProductRepository.updateProduct(product_id, reqProduct);
    }

    static async deleteProduct(req) {
        const { product_id } = req.params;

        const product = await ProductRepository.selectedProduct(product_id);
        if (product.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await ProductRepository.deleteProduct(product_id);
    }
}

module.exports = ProductService;