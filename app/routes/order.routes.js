// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const OrderController = require("../controller/order-controller");

// Define the routes and associate them with the controller methods
router.post('/sign-in', OrderController.signIn);

router.post('/sign-up', OrderController.initSignUpOrder);

router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, OrderController.createOrder ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, OrderController.getOrder ]);

router.route('/:order_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, OrderController.selectedOrder ]).
patch([ UserAuth.verifyToken, OrderController.updateOrder ]).
delete([ UserAuth.verifyToken, OrderController.deleteOrder ]);

module.exports = router;