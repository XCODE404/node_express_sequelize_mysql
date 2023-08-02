// Import the required modules
const { Model, Op } = require("sequelize");
const { Customer, MstRole } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class CustomerRepository extends Model {

    static async createCustomer(customer) {
        return await Customer.create(customer);
    }

    static async getCustomer(req) {
        const { page = DEFINE.PAGE, name, phone  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name || phone) {
            condition[Op.or] = [
            { name: { [Op.like]: `%${ name }%` } },
            { phone: { [Op.like]: `%${ phone }%` } },
            ];
        };

        const { count, rows } = await Customer.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedCustomer(customer_id) {
        const customer = await Customer.findOne({
            where: {
                customer_id,
                del_flg: { [Op.eq]: false }
            },
        });

        return { results: customer };
    }

    static async updateCustomer(customer_id, customer) {
        return await Customer.update(customer, {
            where: {
                customer_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteCustomer(customer_id) {
        return await Customer.update(
            { del_flg: true },
            { where: { customer_id } }
        );
    }

    static async isExistCustomer(phone) {
        return await Customer.findOne({
            where: {
                phone,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = CustomerRepository;