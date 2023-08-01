// Import the required modules
const { Model, Op } = require("sequelize");
const { Product, MstRole } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class ProductRepository extends Model {

    static async signIn(email) {
        return await Product.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            }
        });
    }

    static async createProduct(product) {
        return await Product.create(product);
    }

    static async getProduct(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await Product.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            },
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
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            }
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

    static async isExistProduct(email) {
        return await Product.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = ProductRepository;