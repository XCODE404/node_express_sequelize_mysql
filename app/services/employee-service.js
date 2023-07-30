// Import the required modules
const EmployeeRepository = require("../repository/employee-repository");

// All Business logic will be here
class EmployeeService {
    static async createEmployee(employee) {

    }

    static async getEmployee(req) {
        const employee = await EmployeeRepository.getEmployee(req);
        return FormatData(employee);
    }

    static async selectedEmployee(emplyee_id) {

    }

    static async updateEmployee(emplyee_id) {

    }

    static async deleteEmployee(emplyee_id) {

    }
}

module.exports = EmployeeService;