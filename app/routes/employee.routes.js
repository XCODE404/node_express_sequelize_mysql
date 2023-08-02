// Import the required modules
const router = require('express').Router();
const UserAuth = require("../middlewares/auth");

const { ValidateInput } = require('../validation');
const { Employee } = require('../validation/employee-validate');
const EmployeeController = require("../controller/employee-controller");

// Define the routes and associate them with the controller methods
router.post('/sign-in', EmployeeController.signIn);

router.post('/sign-up', EmployeeController.initSignUpEmployee);

router.route('/').
post([ UserAuth.verifyToken, ValidateInput(Employee), UserAuth.isAdmin, EmployeeController.createEmployee ]).
get([ UserAuth.verifyToken, UserAuth.isAdminOrSupervisor, EmployeeController.getEmployee ]);

router.route('/:employee_id').
get([ UserAuth.verifyToken, UserAuth.isAdmin, EmployeeController.selectedEmployee ]).
patch([ UserAuth.verifyToken, EmployeeController.updateEmployee ]).
delete([ UserAuth.verifyToken, EmployeeController.deleteEmployee ]);

module.exports = router;