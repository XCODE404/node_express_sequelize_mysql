const EmployeeController = require('../controller/employee-controller');

// Import the required modules
const router = require('express').Router();

// Define the routes and associate them with the controller methods
router.route('/').
post([ EmployeeController.createEmployee ]).
get([ EmployeeController.getEmployee ]);

router.route('/:employee_id').
get([ EmployeeController.selectedEmployee ]).
patch([ EmployeeController.updateEmployee ]).
delete([ EmployeeController.deleteEmployee ]);

module.exports = router;