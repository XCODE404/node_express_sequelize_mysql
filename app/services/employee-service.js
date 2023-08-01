// Import the required modules
const EmployeeRepository = require("../repository/employee-repository");
const { CapitalizeFirstLetter, EncodePassword, TodayDate, FormatData, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");

// All Business logic will be here
class EmployeeService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist employee
        const employee = await EmployeeRepository.signIn(email);
        if (!employee) throw new NotFoundError(RESPONSE_MESSAGE.USER_NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, employee.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ employee_id: employee.employee_id, role: employee.mst_role.name });

        return FormatData({ employee: employee, token: token });
    };

    static async createEmployee(req) {
        const reqEmployee = req.body.data; //JSON.parse(atob(req.body.data));

        reqEmployee.name = CapitalizeFirstLetter(reqEmployee.name);
        reqEmployee.password = await EncodePassword(reqEmployee.password);
        reqEmployee.date_of_joining = reqEmployee.date_of_joining? reqEmployee.date_of_joining : await TodayDate();
        reqEmployee.created_agent = await UserAgent(req.useragent);
        reqEmployee.updated_agent = await UserAgent(req.useragent);

        // check exist employee
        const isExistEmployee = await EmployeeRepository.isExistEmployee(reqEmployee.email);
        await DuplicateData(isExistEmployee);

        const employee = await EmployeeRepository.createEmployee(reqEmployee);
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