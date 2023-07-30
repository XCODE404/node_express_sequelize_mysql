// Import the required modules
const express = require('express');

const CategoryController = require('../controller/category_controller');

// Define the CategoryRoutes class
class CategoryRoutes {
    constructor() {
        console.log("CATEGORY ROUTES");
        // Create a new router for this class
        this.router = express.Router();

        this.categorySetupRoutes();
        this.controller = new CategoryController();
    }
    
    categorySetupRoutes() {
        // this.router.get('/', this.controller);
    }
}

// Create an instance of the UserController
const categoryRoutes = new CategoryRoutes();

module.exports = categoryRoutes.router;