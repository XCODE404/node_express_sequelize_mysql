// Import the required modules
const { Model, Op } = require("sequelize");
const { SubCategory, MstRole } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class SubCategoryRepository extends Model {

    static async signIn(email) {
        return await SubCategory.findOne({
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

    static async createSubCategory(sub_category) {
        return await SubCategory.create(sub_category);
    }

    static async getSubCategory(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await SubCategory.findAndCountAll({
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

    static async selectedSubCategory(sub_category_id) {
        const sub_category = await SubCategory.findOne({
            where: {
                sub_category_id,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
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

    static async isExistSubCategory(email) {
        return await SubCategory.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = SubCategoryRepository;