// Import the required modules
const { Model, Op } = require("sequelize");
const { DEFINE } = require("../utils/constants");
const { Product, Category, SubCategory } = require("../../models");

// Dealing with data base operations
class ProductRepository extends Model {

    static async createProduct(product) {
        return await Product.create(product);
    }

    static async getProductCount() {
        return await Product.count();
    }

    static async getProduct(req) {
        const { page = DEFINE.PAGE, name, product_no  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name || product_no) {
            condition[Op.or] = [
            { name: { [Op.like]: `%${ name }%` } },
            { product_no: { [Op.like]: `%${ product_no }%` } }
            ];
        };

        const { count, rows } = await Product.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            include: [{
                model: Category,
                as: "category",
                attributes: ['name']
            }, {
                model: SubCategory,
                as: "subcategory",
                attributes: ['name']
            }],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedProduct(product_id) {
        const product = await Product.findOne({
            where: {
                product_id,
                del_flg: { [Op.eq]: false }
            },
            include: [{
                model: Category,
                as: "category",
                attributes: ['name']
            }, {
                model: SubCategory,
                as: "subcategory",
                attributes: ['name']
            }]
        });

        return { results: product };
    }

    static async updateProduct(product_id, product) {
        return await Product.update(product, {
            where: {
                product_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteProduct(product_id) {
        return await Product.update(
            { del_flg: true },
            { where: { product_id } }
        );
    }

    static async isExistProduct(product_no) {
        return await Product.findOne({
            where: {
                product_no,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = ProductRepository;