// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const OrderDetailController = require("../controller/order_detail-controller");

// Define the routes and associate them with the controller methods
router.post('/sign-in', OrderDetailController.signIn);

router.post('/sign-up', OrderDetailController.initSignUpOrderDetail);

router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, OrderDetailController.createOrderDetail ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, OrderDetailController.getOrderDetail ]);

router.route('/:order_detail_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, OrderDetailController.selectedOrderDetail ]).
patch([ UserAuth.verifyToken, OrderDetailController.updateOrderDetail ]).
delete([ UserAuth.verifyToken, OrderDetailController.deleteOrderDetail ]);

module.exports = router;