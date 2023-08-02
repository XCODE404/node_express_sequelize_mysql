// Import the required modules
const { Model, Op } = require("sequelize");
const { OrderDetail } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class OrderDetailRepository extends Model {

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

    static async getOrderDetailByOrder(order_id) {
        return await OrderDetail.update(
            { del_flg: true },
            { where: { order_id: order_id } }
        );
    }

    static async deleteOrderDetailByOrder(order_id) {
        return await OrderDetail.update(
            { del_flg: true },
            { where: { order_id: order_id } }
        );
    }

    static async deleteOrderDetail(order_detail_id) {
        return await OrderDetail.update(
            { del_flg: true },
            { where: { order_detail_id } }
        );
    }
}

module.exports = OrderDetailRepository;