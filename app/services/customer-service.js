// Import the required modules
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const CustomerRepository = require("../repository/customer-repository");
const MstRoleService = require("./mst_role-service");

// All Business logic will be here
class CustomerService {

    static async createCustomer(req) {
        const reqCustomer = req.body.data; //JSON.parse(atob(req.body.data));

        reqCustomer.name = CapitalizeFirstLetter(reqCustomer.name);
        reqCustomer.password = await EncodePassword(reqCustomer.password);
        reqCustomer.date_of_opening = reqCustomer.date_of_opening? reqCustomer.date_of_opening : await TodayDate();
        reqCustomer.created_employee = req.employee.employee_id;
        reqCustomer.updated_employee = req.employee.employee_id;
        reqCustomer.created_agent = await UserAgent(req.useragent);
        reqCustomer.updated_agent = await UserAgent(req.useragent);

        // check exist customer
        const isExistCustomer = await CustomerRepository.isExistCustomer(reqCustomer.phone);
        await DuplicateData(isExistCustomer);

        return await CustomerRepository.createCustomer(reqCustomer);
    }

    static async getCustomer(req) {
        return await CustomerRepository.getCustomer(req);
    }

    static async selectedCustomer(req) {
        const { customer_id } = req.params;

        return await CustomerRepository.selectedCustomer(customer_id);
    }

    static async updateCustomer(req) {
        const { customer_id } = req.params;
        const reqCustomer = req.body.data; //JSON.parse(atob(req.body.data));
        
        const customer = await CustomerRepository.selectedCustomer(customer_id);
        if (customer.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await CustomerRepository.updateCustomer(customer_id, reqCustomer);
    }

    static async deleteCustomer(req) {
        const { customer_id } = req.params;

        const customer = await CustomerRepository.selectedCustomer(customer_id);
        if (customer.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await CustomerRepository.deleteCustomer(customer_id);
    }
}

module.exports = CustomerService;