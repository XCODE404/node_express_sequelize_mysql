// Import the required modules
const { Model, Op } = require("sequelize");
const { Employee } = require("../../models");
const { DEFINE } = require("../utils/constants");

// Dealing with data base operations
class EmployeeRepository extends Model {
    static async createEmployee(employee) {
        return await Employee.create(employee);
    }

    static async getEmployee(req) {
        const { page = DEFINE.PAGE, name  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name) {
            condition[Op.or] = [
            { name_en: { [Op.like]: `%${ name }%` } },
            { name_mm: { [Op.like]: `%${ name }%` } },
            ];
        };

        const { count, rows } = await Employee.findAndCountAll({
            where: condition,
            order: [["created_date", "ASC"]],
            limit: DEFINE.MATCHING_QUERY_LIMIT,
            offset: ( page - DEFINE.PAGE ) * DEFINE.MATCHING_QUERY_LIMIT
        });
        return { counts: count, results: rows };
    }

    static async selectedEmployee(emplyee_id) {
        const employee = await Employee.findOne({
            where: {
                emplyee_id,
                del_flg: { [Op.eq]: false }
            }
        });

        return { results: employee };
    }

    static async updateEmployee(emplyee_id, employee) {
        return await Employee.update(employee, {
            where: {
                emplyee_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteEmployee(emplyee_id) {
        return await Employee.update(
            { del_flg: true },
            { where: { emplyee_id } }
        );
    }
}

module.exports = EmployeeRepository;