// Import the required modules
const { Model, Op } = require("sequelize");
const { SubCategory, Category } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class SubCategoryRepository extends Model {

    static async createSubCategory(sub_category) {
        return await SubCategory.create(sub_category);
    }

    static async getSubCategory(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
                { name: { [Op.eq]: name } }
            ];
        };

        const { count, rows } = await SubCategory.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            include: {
                model: Category,
                as: "category",
                attributes: ['category_id', 'name']
            },
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedSubCategory(sub_category_id) {
        const sub_category = await SubCategory.findOne({
            where: {
                sub_category_id,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: Category,
                as: "category",
                attributes: ['category_id', 'name']
            }
        });

        return { results: sub_category };
    }

    static async updateSubCategory(sub_category_id, sub_category) {
        return await SubCategory.update(sub_category, {
            where: {
                sub_category_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteSubCategory(sub_category_id) {
        return await SubCategory.update(
            { del_flg: true },
            { where: { sub_category_id } }
        );
    }

    static async isExistSubCategory(name) {
        return await SubCategory.findOne({
            where: {
                name,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = SubCategoryRepository;