// Import the required modules
const { Model, Op } = require("sequelize");
const { Order, MstRole } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class OrderRepository extends Model {

    static async signIn(email) {
        return await Order.findOne({
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

    static async createOrder(order) {
        return await Order.create(order);
    }

    static async getOrder(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await Order.findAndCountAll({
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

    static async selectedOrder(order_id) {
        const order = await Order.findOne({
            where: {
                order_id,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            }
        });

        return { results: order };
    }

    static async updateOrder(order_id, order) {
        return await Order.update(order, {
            where: {
                order_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteOrder(order_id) {
        return await Order.update(
            { del_flg: true },
            { where: { order_id } }
        );
    }

    static async isExistOrder(email) {
        return await Order.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = OrderRepository;