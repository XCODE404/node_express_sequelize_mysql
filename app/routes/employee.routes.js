// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const EmployeeController = require("../controller/employee-controller");

// Define the routes and associate them with the controller methods
router.route('/').
post([ EmployeeController.createEmployee ]).
get([ UserAuth, EmployeeController.getEmployee ]);

router.route('/:employee_id').
get([ EmployeeController.selectedEmployee ]).
patch([ EmployeeController.updateEmployee ]).
delete([ EmployeeController.deleteEmployee ]);

module.exports = router;