// Import the required modules
const EmployeeRepository = require("../repository/employee-repository");
const { CapitalizeFirstLetter, EncodePassword, TodayDate } = require("../utils");

// All Business logic will be here
class EmployeeService {
    static async createEmployee(req) {
        const data = req.body.data; //JSON.parse(atob(req.body.data));

        const tmpEmployee = {
            name: CapitalizeFirstLetter(data.name),
            password: await EncodePassword(data.password),
            date_of_joining: data.date_of_joining? data.date_of_joining : await TodayDate(),
            ...data
        };

        const employee = await EmployeeRepository.createEmployee(tmpEmployee);
        return FormatData(employee); 
    }

    static async getEmployee(req) {
        const employee = await EmployeeRepository.getEmployee(req);
        return FormatData(employee);
    }

    static async selectedEmployee(req) {

    }

    static async updateEmployee(req) {

    }

    static async deleteEmployee(req) {
        
    }
}

module.exports = EmployeeService;