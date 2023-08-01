// Import the required modules
const router = require('express').Router();
const MstRoleController = require('../controller/mst_role-controller');

// Define the routes and associate them with the controller methods
router.route('/').get([ MstRoleController.getMstRole ]);

module.exports = router;