// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const SubCategoryController = require("../controller/sub_category-controller");

// Define the routes and associate them with the controller methods
router.post('/sign-in', SubCategoryController.signIn);

router.post('/sign-up', SubCategoryController.initSignUpSubCategory);

router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, SubCategoryController.createSubCategory ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, SubCategoryController.getSubCategory ]);

router.route('/:sub_category_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, SubCategoryController.selectedSubCategory ]).
patch([ UserAuth.verifyToken, SubCategoryController.updateSubCategory ]).
delete([ UserAuth.verifyToken, SubCategoryController.deleteSubCategory ]);

module.exports = router;