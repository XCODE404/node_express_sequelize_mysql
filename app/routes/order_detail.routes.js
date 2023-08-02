// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const { ValidateInput } = require('../validation');
const { OrderDetail } = require('../validation/order_detail-validate');
const OrderDetailController = require("../controller/order_detail-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, ValidateInput(OrderDetail), OrderDetailController.createOrderDetail ]).
get([ UserAuth.verifyToken, OrderDetailController.getOrderDetail ]);

router.route('/:order_detail_id').
get([ UserAuth.verifyToken, OrderDetailController.selectedOrderDetail ]).
patch([ UserAuth.verifyToken, OrderDetailController.updateOrderDetail ]).
delete([ UserAuth.verifyToken, OrderDetailController.deleteOrderDetail ]);

module.exports = router;