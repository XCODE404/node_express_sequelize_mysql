// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const CustomerController = require("../controller/customer-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ UserAuth.verifyToken, UserAuth.isAdmin, CustomerController.createCustomer ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, CustomerController.getCustomer ]);

router.route('/:customer_id').
get([ UserAuth.verifyToken, CustomerController.selectedCustomer ]).
patch([ UserAuth.verifyToken, CustomerController.updateCustomer ]).
delete([ UserAuth.verifyToken, CustomerController.deleteCustomer ]);

module.exports = router;