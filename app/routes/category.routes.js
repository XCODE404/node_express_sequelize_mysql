// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const CategoryController = require("../controller/category-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, CategoryController.createCategory ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, CategoryController.getCategory ]);

router.route('/:category_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, CategoryController.selectedCategory ]).
patch([ UserAuth.verifyToken, CategoryController.updateCategory ]).
delete([ UserAuth.verifyToken, CategoryController.deleteCategory ]);

module.exports = router;