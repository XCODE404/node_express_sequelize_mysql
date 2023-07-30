const { CustomerRepository } = require('../repository')


// All Business logic will be here
class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }

    async CreateCustomer() {

    }

    async GetCustomer() {

    }

    async GetSelectedCustomer() {
        
    }

    async UpdateCustomer() {

    }

    async DeleteCustomer() {

    }

}

module.exports = CustomerService;