// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const { ValidateInput } = require('../validation');
const { Order } = require('../validation/order-validate');
const OrderController = require("../controller/order-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, ValidateInput(Order), OrderController.createOrder ]).
get([ UserAuth.verifyToken, OrderController.getOrder ]);

router.route('/:order_id').
get([ UserAuth.verifyToken, OrderController.selectedOrder ]).
patch([ UserAuth.verifyToken, OrderController.updateOrder ]).
delete([ UserAuth.verifyToken, OrderController.deleteOrder ]);

module.exports = router;