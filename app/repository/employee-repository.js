// Import the required modules
const { Model, Op } = require("sequelize");
const { Employee } = require("../../models/employee");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class EmployeeRepository extends Model {
    static async createEmployee(employee) {

    }

    static async getEmployee() {

        const { page = DEFINE.PAGE, name  } = req.query;

        let where_condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            where_condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await Employee.findAndCountAll({
            where: where_condition,
            order: [["created_date", "ASC"]],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedEmployee(emplyee_id) {

    }

    static async updateEmployee(emplyee_id) {

    }

    static async deleteEmployee(emplyee_id) {

    }
}

module.exports = EmployeeRepository;