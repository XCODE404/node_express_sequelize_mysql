// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const ProductController = require("../controller/product-controller");

// Define the routes and associate them with the controller methods
router.post('/sign-in', ProductController.signIn);

router.post('/sign-up', ProductController.initSignUpProduct);

router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, ProductController.createProduct ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, ProductController.getProduct ]);

router.route('/:product_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, ProductController.selectedProduct ]).
patch([ UserAuth.verifyToken, ProductController.updateProduct ]).
delete([ UserAuth.verifyToken, ProductController.deleteProduct ]);

module.exports = router;