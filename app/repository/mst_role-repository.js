// Import the required modules
const { Model, Op } = require("sequelize");
const { MstRole } = require("../../models");

// Dealing with data base operations
class MstRoleRepository extends Model {
    static async getMstRole(state) {
        let condition = { del_flg: { [Op.eq]: false } };
        if (state === "init") {
            condition[Op.or] = [
                { name: { [Op.eq]: "admin" } }
            ];
        }
        return await MstRole.findAll({ 
            where: condition,
            attributes: ['role_id', 'name'] 
        });
    }
}

module.exports = MstRoleRepository;