// Import the required modules
const EmployeeRepository = require("../repository/employee-repository");
const { CapitalizeFirstLetter, EncodePassword, TodayDate, FormatData, DuplicateData } = require("../utils");

// All Business logic will be here
class EmployeeService {
    static async createEmployee(req) {
        const tmpEmployee = req.body.data; //JSON.parse(atob(req.body.data));

        tmpEmployee.name = CapitalizeFirstLetter(tmpEmployee.name);
        tmpEmployee.password = await EncodePassword(tmpEmployee.password);
        tmpEmployee.date_of_joining = tmpEmployee.date_of_joining? tmpEmployee.date_of_joining : await TodayDate();

        const isExistEmployee = await EmployeeRepository.isExistEmployee(tmpEmployee.email);
        await DuplicateData(isExistEmployee);

        const employee = await EmployeeRepository.createEmployee(tmpEmployee);
        return FormatData(employee); 
    }

    static async getEmployee(req) {
        const employee = await EmployeeRepository.getEmployee(req);
        return FormatData(employee);
    }

    static async selectedEmployee(req) {
        const { employee_id } = req.params;
        
        const employee = await EmployeeRepository.selectedEmployee(employee_id);
        return FormatData(employee);
    }

    static async updateEmployee(req) {

    }

    static async deleteEmployee(req) {
        
    }
}

module.exports = EmployeeService;