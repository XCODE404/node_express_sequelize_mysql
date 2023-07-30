const { ProductRepository } = require('../repository')


// All Business logic will be here
class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct() {

    }

    async GetProduct() {

    }

    async GetSelectedProduct() {
        
    }

    async UpdateProduct() {

    }

    async DeleteProduct() {

    }

}

module.exports = ProductService;