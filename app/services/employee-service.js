// Import the required modules
const MstRoleService = require("./mst_role-service");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const EmployeeRepository = require("../repository/employee-repository");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");

// All Business logic will be here
class EmployeeService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist employee
        const employee = await EmployeeRepository.signIn(email);
        if (!employee) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, employee.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ employee_id: employee.employee_id, role: employee.mst_role.name });

        return { employee: employee, token: token };
    };

    static async initSignUpEmployee(req) {
        // get admin role id
        const role = await MstRoleService.getMstRole("init");

        const reqEmployee = {};
        reqEmployee.role_id = role[0].role_id;
        reqEmployee.name = CapitalizeFirstLetter("developer 1");
        reqEmployee.email = "developer1@gmail.com"
        reqEmployee.password = await EncodePassword("12345678");
        reqEmployee.date_of_joining = await TodayDate();
        reqEmployee.created_agent = await UserAgent(req.useragent);
        reqEmployee.updated_agent = await UserAgent(req.useragent);

        // check exist employee
        const isExistEmployee = await EmployeeRepository.isExistEmployee(reqEmployee.email);
        await DuplicateData(isExistEmployee);

        return await EmployeeRepository.createEmployee(reqEmployee);
    }

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

        return await EmployeeRepository.createEmployee(reqEmployee);
    }

    static async getEmployee(req) {
        return await EmployeeRepository.getEmployee(req);
    }

    static async selectedEmployee(req) {
        const { employee_id } = req.params;

        return await EmployeeRepository.selectedEmployee(employee_id);
    }

    static async updateEmployee(req) {
        const { employee_id } = req.params;
        const reqEmployee = req.body.data; //JSON.parse(atob(req.body.data));
        
        const employee = await EmployeeRepository.selectedEmployee(employee_id);
        if (employee.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await EmployeeRepository.updateEmployee(employee_id, reqEmployee);
    }

    static async deleteEmployee(req) {
        const { employee_id } = req.params;

        const employee = await EmployeeRepository.selectedEmployee(employee_id);
        if (employee.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await EmployeeRepository.deleteEmployee(employee_id);
    }
}

module.exports = EmployeeService;