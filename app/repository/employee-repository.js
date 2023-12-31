// Import the required modules
const { Model, Op } = require("sequelize");
const { DEFINE } = require("../utils/constants");
const { Employee, MstRole } = require("../../models");

// Dealing with data base operations
class EmployeeRepository extends Model {

    static async signIn(email) {
        return await Employee.findOne({
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

    static async createEmployee(employee) {
        return await Employee.create(employee);
    }

    static async getEmployee(req) {
        const { page = DEFINE.PAGE, name, email  } = req.query;

        let condition = { del_flg: { [Op.eq]: false } };
        if (name || email) {
            condition[Op.or] = [
            { name: { [Op.like]: `%${ name }%` } },
            { email: { [Op.like]: `%${ email }%` } },
            ];
        };

        const { count, rows } = await Employee.findAndCountAll({
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

    static async selectedEmployee(employee_id) {
        const employee = await Employee.findOne({
            where: {
                employee_id,
                del_flg: { [Op.eq]: false }
            },
            include: {
                model: MstRole,
                as: "mst_role",
                attributes: ['role_id', 'name']
            }
        });

        return { results: employee };
    }

    static async updateEmployee(employee_id, employee) {
        return await Employee.update(employee, {
            where: {
                employee_id,
                del_flg: { [Op.eq]: false }
            }
        });
    }

    static async deleteEmployee(employee_id) {
        return await Employee.update(
            { del_flg: true },
            { where: { employee_id } }
        );
    }

    static async isExistEmployee(email) {
        return await Employee.findOne({
            where: {
                email,
                del_flg: { [Op.eq]: false }
            }
        });
    }
}

module.exports = EmployeeRepository;