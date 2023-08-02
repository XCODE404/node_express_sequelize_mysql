// Import the required modules
const { Model, Op } = require("sequelize");
const { DEFINE } = require("../utils/constants");
const { Order, Customer, OrderDetail, Product } = require("../../models");

// Dealing with data base operations
class OrderRepository extends Model {

    static async createOrder(order) {
        return await Order.create(order);
    }

    static async getOrder(req) {
        const { page = DEFINE.PAGE, name, order_no  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name || order_no) {
            condition[Op.or] = [
                { name: { [Op.like]: `%${ name }%` } },
                { order_no: { [Op.like]: `%${ order_no }%` } }
            ];
        };

        const { count, rows } = await Order.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            include: [{
                model: OrderDetail,
                as: "order_detail",
                attributes: ['item'],
                include: [{
                    model: Product,
                    as: "product",
                    attributes: ['name']
                }]
            }, {
                model: Customer,
                as: "customer",
                attributes: ['name', 'phone']
            }],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: rows.length, results: rows };
    }

    static async selectedOrder(order_id) {
        const order = await Order.findOne({
            where: {
                order_id,
                del_flg: { [Op.eq]: false }
            },
            include: [{
                model: OrderDetail,
                as: "order_detail",
                attributes: ['item'],
                include: [{
                    model: Product,
                    as: "product",
                    attributes: ['name']
                }]
            }, {
                model: Customer,
                as: "customer",
                attributes: ['name', 'phone']
            }]
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
}

module.exports = OrderRepository;