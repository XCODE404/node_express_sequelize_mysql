// Import the required modules
const CategoryService = require("../services/category-service");

// Define the CategoryController class
class CategoryController {
    constructor() {
        console.log("CATEGORY CONTROLLER");
        this.service = new CategoryService();
    }

    async CreateCategory(req, res, next){
        
    }

    async GetCategory(req, res, next){
        console.log('Get Category')
    }
   
    async FindSelectedCategory(req, res, next){

    }
}

// Create an instance of the CategoryController
const categoryController = new CategoryController();

module.exports = categoryController;