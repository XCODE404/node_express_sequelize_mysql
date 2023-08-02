// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const validateInput = require('../validation');
const { Category } = require('../validation/category-validate');
const CategoryController = require("../controller/category-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, validateInput.ValidateInput(Category), UserAuth.isAdminOrSupervisor, CategoryController.createCategory ]).
get([ UserAuth.verifyToken, CategoryController.getCategory ]);

router.route('/:category_id').
get([ UserAuth.verifyToken, CategoryController.selectedCategory ]).
patch([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, CategoryController.updateCategory ]).
delete([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, CategoryController.deleteCategory ]);

module.exports = router;