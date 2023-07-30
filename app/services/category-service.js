// Import the required modules
const { CategoryRepository } = require('../repository')

// All Business logic will be here
class CategoryService {
    constructor() {
        console.log("CATEGORY SERVICES");
        this.repository = new CategoryRepository();
    }

    async CreateCategory(){

    }

    async GetCategory(){
       
    }
   
    async FindSelectedCategory(category_id){

    }
}

// Create an instance of the CategoryService
const categoryService = new CategoryService();

module.exports = categoryService;