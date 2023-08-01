// Import the required modules
const { Model, Op } = require("sequelize");
const { OrderDetail, MstRole } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class OrderDetailRepository extends Model {

    static async signIn(email) {
        return await OrderDetail.findOne({
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

    static async createOrderDetail(order_detail) {
        return await OrderDetail.create(order_detail);
    }

    static async getOrderDetail(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await OrderDetail.findAndCountAll({
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

    static async selectedOrderDetail(order_detail_id) {
        const order_detail = await OrderDetail.findOne({
            where: {
                order_detail_id,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            }
        });

        return { results: order_detail };
    }

    static async updateOrderDetail(order_detail_id, order_detail) {
        return await OrderDetail.update(order_detail, {
            where: {
                order_detail_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteOrderDetail(order_detail_id) {
        return await OrderDetail.update(
            { del_flg: true },
            { where: { order_detail_id } }
        );
    }

    static async isExistOrderDetail(email) {
        return await OrderDetail.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = OrderDetailRepository;