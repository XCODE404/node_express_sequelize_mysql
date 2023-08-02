// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const SubCategoryController = require("../controller/sub_category-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, SubCategoryController.createSubCategory ]).
get([ UserAuth.verifyToken, SubCategoryController.getSubCategory ]);

router.route('/:sub_category_id').
get([ UserAuth.verifyToken, SubCategoryController.selectedSubCategory ]).
patch([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, SubCategoryController.updateSubCategory ]).
delete([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, SubCategoryController.deleteSubCategory ]);

module.exports = router;