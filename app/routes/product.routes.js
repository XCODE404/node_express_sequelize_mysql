// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const ProductController = require("../controller/product-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, ProductController.createProduct ]).
get([ UserAuth.verifyToken, ProductController.getProduct ]);

router.route('/:product_id').
get([ UserAuth.verifyToken, ProductController.selectedProduct ]).
patch([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, ProductController.updateProduct ]).
delete([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, ProductController.deleteProduct ]);

module.exports = router;