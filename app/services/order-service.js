const { OrderRepository } = require('../repository')


// All Business logic will be here
class OrderService {
    constructor() {
        this.repository = new OrderRepository();
    }

    async CreateOrder() {

    }

    async GetOrder() {

    }

    async GetSelectedOrder() {
        
    }

    async UpdateOrder() {

    }

    async DeleteOrder() {

    }

}

module.exports = OrderService;