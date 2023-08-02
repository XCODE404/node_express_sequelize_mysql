// Import the required modules
const { Model, Op } = require("sequelize");
const { Category } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class CategoryRepository extends Model {

    static async signIn(email) {
        return await Category.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            },
        });
    }

    static async createCategory(category) {
        return await Category.create(category);
    }

    static async getCategory(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name: { [Op.like]: `%${ name }%` } }
            ];
        };

        const { count, rows } = await Category.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedCategory(category_id) {
        const category = await Category.findOne({
            where: {
                category_id,
                del_flg: { [Op.eq]: false }
            },
        });

        return { results: category };
    }

    static async updateCategory(category_id, category) {
        return await Category.update(category, {
            where: {
                category_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteCategory(category_id) {
        return await Category.update(
            { del_flg: true },
            { where: { category_id } }
        );
    }

    static async isExistCategory(name) {
        return await Category.findOne({
            where: {
                name,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = CategoryRepository;