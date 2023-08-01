// Import the required modules
const MstRoleRepository = require("../repository/mst_role-repository");

// All Business logic will be here
class MstRoleService {
    static async getMstRole(state = "default"){
        return await MstRoleRepository.getMstRole(state);
    }
}

module.exports = MstRoleService;