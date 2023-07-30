const { EmployeeRepository } = require('../repository')


// All Business logic will be here
class EmployeeService {
    constructor() {
        this.repository = new EmployeeRepository();
    }

    async CreateEmployee() {

    }

    async GetEmployee() {

    }

    async GetSelectedEmployee() {
        
    }

    async UpdateEmployee() {

    }

    async DeleteEmployee() {

    }

}

module.exports = EmployeeService;